import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const contact = () => {
  return (
    <View>
      <Text>Contact</Text>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </View>
  )
}

export default contact

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  label:{
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    width: '80%',
  },

});