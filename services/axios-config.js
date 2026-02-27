import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Fix for Android Emulators (10.0.2.2) vs iOS/Web (localhost)
const BASE_URL = Platform.OS === 'android' ? "http://192.168.1.10:8888/" : "http://localhost:8888/";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    console.log(`🚀 Requesting: ${config.baseURL}${config.url}`);
    const jwtToken = await AsyncStorage.getItem("jwtToken");
    if (jwtToken) {
      // Your backend expects "Bearer <token>"
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
      console.log("Token attached to request");
    }
  } catch (error) {
    console.error("Error fetching token from storage", error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;