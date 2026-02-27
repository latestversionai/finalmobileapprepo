import axios from 'axios';
import api from './axios-config';

const flightService = {
  // Main function to get all flights
  getAllFlights: async () => {
    try {
      const response = await api.get('trips');
      //console.log("Data coming back: ", response.data);
      const trips = response.data.allTrips || [];
      return trips;
    } catch (error) {
      // Detailed logging for your test
      console.error("trip service error: ", error.message);
      throw error;
    }
  },

  getAllCities: async () => {
    try{
      const response = await api.get("/departureCities")
      const cities = response.data.allDepartureCities
      console.log(cities)
      return response.data;
    }catch(error){
      console.error("Error fetching city lisst: ", error);
      return ["Bozeman, Seattle, Austin"];
    }
  },

  insertFlight: async (flightData) => {
    try{
      const payload = {
        depCity: flightData.depCity,
        arrCity: flightData.arrCity,
        dayOfTrip: flightData.dayOfTrip,
        priceOfTrip: Number(flightData.priceOfTrip) || 0
      }
      console.log("payload: ", payload)
      const response = await api.post('trips', payload);
      console.log("Insert Success:", response.data);
    }catch(error){
      console.error("Insert error: ", error.message);
      throw error;
    }
  },


  getFlightsByUser: async (id) => {
    try{
      const response = await api.get('trips/my-trips');
      return response.data;
    }catch(error){
      console.error("Error in updateFlight service: ", error)
      throw error;
    }
  },


  getTripById: async (id) => {
    console.log("getTripById is calling ID: ", id)
    try{
      const response = await api.get(`trips/${id}`);
      console.log("Service reecieved trip data: ", response.data);
      const data = response.data.trip;
      //return response.data.trip
      return Array.isArray(data) ? data[0] : data
    }catch(error){
      console.error("Error in getTripById service: ", error.message);
      return null;
    }
  },

  updateFlight: async (id, flightData) => {
    try{
      const response = await api.put(`trips/${id}`, flightData);
      console.log(response.data)
      return response.data;
    }catch(error){
      console.error("Error during updateFlight: ", error);
      throw error;
    }

  },

  deleteFlight: async (id) => {
    try{
      const response = await api.delete(`trips/${id}`);
      console.log("Delete Response: ", response.data);
      return response.data;
    }catch(error){
      console.error("Error during deleteFlight: ", error);
      throw error;
    }
  },

  testGetAllCities: async () => {
    try{
      const data = await flightService.getAllCities();
      console.log("TEST PASSED: sample city data  --", data[0])
      return true
    }catch(error){
      console.log("test failed - ", error.message);
      return false;
    }
  },

  // Connection Test Utility
  testConnection: async () => {
  console.log("🧪 Running Trip Connection Test...");
  try {
    const data = await flightService.getAllFlights(); 
    
    // 'data' is now the array [0, 1, 2, 3, 4]
    console.log("✅ Test Passed! Received:", data.length, "trips.");
    
    // Look at the first item to verify the SQL columns
    console.log("Sample Trip Data:", data[0]); 
    
    return true;
  } catch (e) {
    console.log("⚠️ Test Failed. Error:", e.message);
    return false;
  }
}
};

export default flightService;