import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import flightService from '../../services/flightService';
import CustomScreen from '../../components/CustomScreen';
import stylesCustom from '../../styles/styles';

const UpdateFlightDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [options, setOptions] = useState({ cities: [], days: [] });
  const [form, setForm] = useState({
    depCity: '',
    arrCity: '',
    dayOfTrip: '',
    priceOfTrip: ''
  });

  // 1. Load Dropdown Options AND the specific Flight data
  useEffect(() => {
    const initializeScreen = async () => {
      try {
        // Building the dropdowns
        const allFlights = await flightService.getAllFlights();
        const uniqueCities = [...new Set(allFlights.map(f => f.depCity))].map(c => ({ label: c, value: c }));
        const uniqueDays = [...new Set(allFlights.map(f => f.dayOfTrip))].map(d => ({ label: d, value: d }));
        setOptions({ cities: uniqueCities, days: uniqueDays });

        // Fetch the specific flight details to pre-fill the form
        const existingFlight = await flightService.getTripById(id);
        console.log("🔍 Database keys available:", Object.keys(existingFlight || {}));
        console.log("🔍 Full object:", existingFlight);
        if(existingFlight){
          setForm({
          depCity: existingFlight.depCity,
          arrCity: existingFlight.arrCity,
          dayOfTrip: existingFlight.dayOfTrip,
          priceOfTrip: existingFlight.priceOfTrip?.toString() || '' // Convert number to string for TextInput
        });
        }else{
        console.error("Initialization failed", err);
        Alert.alert("Error", "Could not load flight data.");
        }
      }catch(err) {
        console.error("Initialization error catch:", err);
        Alert.alert("Error", "Could not connect to the server.");
      }
    };

    initializeScreen();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if(form.depCity.trim().toLowerCase() === form.arrCity.trim().toLowerCase()){
        Alert.alert("Invalid trip!", "Departure and Arrival cities should not be the same!!");
        return;
      }
      
      if(Number(form.priceOfTrip) > 500){
        Alert.alert("Invalid Price....", "Trips should not exceed $500 on frugalFlights 🕶️")
        return;
      }
      
      if(!form.depCity || !form.arrCity || !form.priceOfTrip){
        Alert.alert("Incomplete", "Please fill out all flight details.")
      }

      await flightService.updateFlight(id, form);
      Alert.alert("Success", "Flight updated successfully! ✈️");
      router.replace('/main');
    } catch (err) {
      console.error("Update failed", err);
      Alert.alert("Error", "Could not update flight.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this flight?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await flightService.deleteFlight(id);
              Alert.alert("Success -- ", "Trip deleted!");
              router.replace('/main');
            } catch (err) {
              Alert.alert("Error", "Delete failed.");
            }
          } 
        }
      ]
    );
  };

  return (
    <CustomScreen>
      <Text style={styles.header}>edit your trip</Text>

      {/* Departure City Picker */}
      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Departure City...', value: '' }}
          value={form.depCity} // Crucial: This binds the picker to current state
          onValueChange={(value) => setForm({...form, depCity: value})}
          items={options.cities}
          style={pickerSelectStyles}
        />
      </View>

      {/* Arrival City Picker */}
      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Arrival City...', value: '' }}
          value={form.arrCity}
          onValueChange={(value) => setForm({...form, arrCity: value})}
          items={options.cities}
          style={pickerSelectStyles}
        />
      </View>

      {/* Day Picker */}
      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Day of Departure...', value: '' }}
          value={form.dayOfTrip}
          onValueChange={(value) => setForm({...form, dayOfTrip: value})}
          items={options.days}
          style={pickerSelectStyles}
        />
      </View>

      {/* Price Input */}
      <TextInput 
        style={styles.inputContainer}
        placeholder="Price"
        value={form.priceOfTrip}
        keyboardType="numeric"
        onChangeText={(text) => setForm({...form, priceOfTrip: text})}
      />

      {/* Action Buttons */}
      <TouchableOpacity style={[styles.submitBtn, {flexDirection:'row', alignItems:'center', justifyContent:'center'}]} onPress={handleUpdate}>
        <Text style={[styles.btnText, {flexDirection:'row'}]}>Update Flight Details   </Text>
        <Ionicons name='pencil' style={{flexDirection:'row'}}></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.submitBtn, { borderColor: 'red', marginTop: 15, flexDirection:'row', alignItems:'center', justifyContent:'center' }]} onPress={handleDelete}>
        <Text style={[styles.btnText, { color: 'red', justifyContent:'center' }]}>Delete Trip  </Text>
        <Ionicons name='trash' style={{flexDirection:'row'}}></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>{"<-- Cancel"}</Text>
      </TouchableOpacity>
    </CustomScreen>
  );
};

// Reusing your exact styles
const styles = StyleSheet.create({
  header: { color: 'blue', fontSize: 20, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  inputContainer: { 
    borderWidth: 2, 
    borderColor: 'black', 
    marginBottom: 15, 
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white',
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  submitBtn: { 
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 25, 
    padding: 15, 
    alignItems: 'center',
    marginTop: 10 
  },
  btnText: { fontWeight: 'bold' },
  backLink: { textAlign: 'center', marginTop: 20, color: 'gray' }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, color: 'black', width: '100%' },
  inputAndroid: { fontSize: 16, color: 'black', width: '100%' },
  placeholder: { color: 'gray' },
});

export default UpdateFlightDetailScreen;