import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import CustomScreen from "../../components/CustomScreen"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import stylesCustom from '../../styles/styles'
import {Colors, Fonts, Spacing} from "../../Theme"
import { Ionicons } from '@expo/vector-icons'
import api from '../../services/axios-config'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = () => {

  const {login} = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  const apiLogin = async () => {
    if(!email || !password){
      Alert.alert("Error", "Email or Password is empty")
      return;
    }
    setLoading(true)

    try{
      const response = await api.post("login", {email, password});
      //console.log("Full Response Object:", response);
      console.log("Response Data:", response.data);
      //console.log("Response Headers:", response.headers);
      const authHeader = response.headers.get('authorization') || response.headers.get('Authorization');
      console.log("Header returned: ", authHeader)
     if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        await AsyncStorage.setItem("jwtToken", token);
        console.log("Token was saved...");
        const displayName = response.data.firstName;
        const userId = response.data.userId;
        console.log("User Data: ", response.data.firstName + " " + response.data.userId);
        login(displayName, userId)
      }else{
        console.log("WARNING: No Authorization header found in response")
      }
      router.replace("/main");
    }catch(error){
      console.log(error);
      const errorMsg = error.response?.data?.message || "Invalid Login Alert!";
      Alert.alert("Login Failed", "Invalid Email or Password!!");
    }finally{
      setLoading(false);
    }
  };


  return (
    <CustomScreen style={[stylesCustom.container, {backgroundColor: '#a3d5ccb6', alignItems: 'center',}]}>
      <Text style={{fontSize:Fonts.large, color: Colors.error, paddingBottom:Spacing.small}}>Login</Text>
      <CustomInput placeholder="email here" value={email}
      onChangeText={setEmail} autoCapitalize="none" />
      <CustomInput placeholder="password..." value={password}
      onChangeText={setPassword} secureTextEntry />
      <Text>{email + "      " +  password}</Text>
      <CustomButton onPress={apiLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={[styles.btnText, {height:20}]}>Go!</Text>
            <Ionicons name="airplane" size={20} color="white" />
          </View>
        )}
      </CustomButton>
    </CustomScreen>
  );
}

export default LoginScreen



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'black',
  }
})
