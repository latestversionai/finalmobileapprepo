import axios from './axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });

    // get token from the headers
    const authorizationHeader = response.headers['authorization'] || response.headers['Authorization'];
    const token = authorizationHeader?.substring('Bearer '.length);

    //user details from the body
    const user = response.data;

    //save to async storage for 'persistence'
    if(token){
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    }

    return { user, token };
  } catch (error) {
    // Catch that 401 "invalid login" from your backend
    throw error.response?.data?.message || 'Login failed';
  }
};