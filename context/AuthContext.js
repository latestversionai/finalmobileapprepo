import React, { Children } from 'react'
import { useState, useEffect, useContext, createContext } from 'react'
import AsyncStorage
from '@react-native-async-storage/async-storage'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
        const savedName = await AsyncStorage.getItem('userName');
        const savedId = await AsyncStorage.getItem('userId');
        if(savedName) setUserName(savedName);
        if(savedId) setUserId(savedId);
        setLoading(false);
      };
    loadUserData();
  }, []);

  const login = async (name, id) => {
    console.log("Context login received name : ", name)
    setUserName(name);
    setUserId(id)
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userId', id.toString());
  };

  const logout = async () => {
    setUserName(null);
    setUserId(null);
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('jwtToken');
  };

  return(
    <AuthContext.Provider value={{userName, userId, login, logout, loading}}>
      {children}

    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);