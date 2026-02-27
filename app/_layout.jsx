import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Slot } from 'expo-router'
import { AuthProvider } from '../context/AuthContext'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',     // Centers horizontally
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
  },})