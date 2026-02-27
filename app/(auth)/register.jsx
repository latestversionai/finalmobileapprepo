import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import api from '../../services/axios-config'; // Your axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomScreen from '../../components/CustomScreen';
import styles from '../../styles/styles'; // Adjust path to your styles

const RegisterScreen = () => {
  const { login } = useAuth();
  const router = useRouter();

  // New state for registration
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [confirmEmail, setConfirmEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    const emailRegex = /^[a-zA-Z][^\s@]{2,}@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error: ", "All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
    Alert.alert(
      "Invalid Email",
      "Email must start with a letter, have at least 3 characters before the '@', and include a valid domain."
    );
    return;
  }

    if (!passwordRegex.test(password)) {
    Alert.alert(
      "Weak Password", 
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number."
    );
    return;
  }

    if(email.toLowerCase() !== confirmEmail.toLowerCase()){
      Alert.alert("Error: ", "Emails do not match")
      return;
    }

    if(password !== confirmPassword){
      Alert.alert("Error: ", "Passwords do not match")
      setConfirmPassword('');
      setPassword('');
      return;
    }

    setLoading(true);

    try {
      // 1. Hit the registration endpoint

      const userData ={
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      roleId: 1, // Default to standard user
      active: 1,  // Default to active
      salt: "xxx"
      }

      const response = await api.post("users", userData);
      console.log("Registration Response:", response.data);
      if(response.status === 201){
        Alert.alert("Success, ", "Account created - go ahead and login!")
        router.replace("/login");
      }
    }catch(error){
      console.log( "Error during registering: ", error)
      const errorMsg = error.response?.data?.errorMessages?.[0] || "Registration failed.";
      const fallbackMsg = "Something went wrong - please try again";
      Alert.alert("Registration Error", errorMsg);
    }finally{
      setLoading(false);
    }
  }
  return (
    <CustomScreen>
  <Text style={styles.header}>Create Account</Text>

  <TextInput style={styles.inputContainer} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
  
  <TextInput style={styles.inputContainer} placeholder="Last Name" value={lastName} onChangeText={setLastName} />

  <TextInput 
    style={styles.inputContainer} 
    placeholder="Email Address" 
    value={email} 
    onChangeText={setEmail} 
    keyboardType="email-address" 
    autoCapitalize="none" 
  />

  <TextInput 
    style={styles.inputContainer} 
    placeholder="Confirm Email" 
    value={confirmEmail} 
    onChangeText={setConfirmEmail} 
    keyboardType="email-address" 
    autoCapitalize="none" 
  />

  <TextInput 
    style={styles.inputContainer} 
    placeholder="Password" 
    value={password} 
    onChangeText={setPassword} 
    secureTextEntry 
  />

  <TextInput 
    style={styles.inputContainer} 
    placeholder="Confirm Password" 
    value={confirmPassword} 
    onChangeText={setConfirmPassword} 
    secureTextEntry 
  />

  <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} disabled={loading}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign Up</Text>}
  </TouchableOpacity>
</CustomScreen>
  );
};

export default RegisterScreen;