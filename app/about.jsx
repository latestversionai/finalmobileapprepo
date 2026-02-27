import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const about = () => {
  return (
    <View>
      <Text style={{color:"pink"}}>About</Text>
      <Link href="/">Home</Link>
      <Link href="/contact">Contact</Link>
    </View>
  )
}

export default about

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