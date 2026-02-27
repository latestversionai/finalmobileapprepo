import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import flightService from '../../services/flightService';
import CustomScreen from '../../components/CustomScreen';

const AddFlightScreen = () => {
  const router = useRouter();
  const [options, setOptions] = useState({ cities: [], days: [] });
  const [form, setForm] = useState({
    depCity: '',
    arrCity: '',
    dayOfTrip: '',
    priceOfTrip: ''
  });

  const testGetAllCities = async () => {
    try {
      const data = await flightService.getAllCities();
      console.log("TEST PASSED: sample city data --", data[1]);
      return true;
    } catch (error) {
      console.log("test failed - ", error.message);
      return false;
    }
  };


  // Load existing data to populate dropdowns
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const allFlights = await flightService.getAllFlights();
        const uniqueCities = [...new Set(allFlights.map(f => f.depCity))].map(c => ({ label: c, value: c }));
        const uniqueDays = [...new Set(allFlights.map(f => f.dayOfTrip))].map(d => ({ label: d, value: d }));
        setOptions({ cities: uniqueCities, days: uniqueDays });
      } catch (err) {
        console.error("Failed to load options", err);
      }
    };
    loadOptions();
  }, []);

  const handlePost = async () => {
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


    try {
      await flightService.insertFlight(form);
      Alert.alert("Success", "Flight added! ✈️");
      router.back();
    } catch (err) {
      //Alert.alert("Error", "Could not save flight.");
      const backendError = err.response?.data?.errorMessages;
      //const errorString = backendError ? backendError.join(", ") : "Could not save flight.";
      console.log("Validation Errors: ", backendError);
    }
  };

  return (
    <CustomScreen>
      <Text style={styles.header}>add a flight</Text>

      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Departure City...', value: null }}
          onValueChange={(value) => setForm({...form, depCity: value})}
          items={options.cities}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Arrival City...', value: null }}
          onValueChange={(value) => setForm({...form, arrCity: value})}
          items={options.cities}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.inputContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Day of Departure...', value: null }}
          onValueChange={(value) => setForm({...form, dayOfTrip: value})}
          items={options.days}
          style={pickerSelectStyles}
        />
      </View>

      <TextInput 
        style={styles.inputContainer}
        placeholder="Price"     // will consider adding random generated "price-questions" for fun
        keyboardType="numeric"
        onChangeText={(text) => setForm({...form, priceOfTrip: text})}
      />

    {/*<TouchableOpacity 
      style={{ backgroundColor: 'gray', padding: 10, marginTop: 20 }}
      onPress={() => testGetAllCities()}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>🛠 Run Service Test</Text>
    </TouchableOpacity>*/}

      <TouchableOpacity style={styles.submitBtn} onPress={handlePost}>
        <Text style={styles.btnText}>Submit Your Trip ✈️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>{"<-- Back (To Landing)"}</Text>
      </TouchableOpacity>
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  header: { color: 'red', fontSize: 20, textAlign: 'center', marginBottom: 20, textDecorationLine:"underline" },
  inputContainer: { 
    borderWidth: 2, 
    borderColor: 'black', 
    marginBottom: 15, 
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white', // Ensures text is visible
    minHeight: 50,           // Forces height for the picker
    justifyContent: 'center'
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
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',    // Force full width
    minWidth: 300,    // Ensure a minimum visibility
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30,
    width: '100%',
  },
  placeholder: {
    color: 'gray',
  },
});


export default AddFlightScreen;