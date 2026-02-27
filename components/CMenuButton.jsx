import React from "react";
import {Pressable, Text, StyleSheet} from 'react-native'
import {Colors, Fonts} from '../Theme'

const CMenuButton = ({title, onPress, halfWidth=false}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => 
    [styles.button, halfWidth ? styles.half : styles.full, 
    pressed && styles.pressed]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  full: {
    width: '100%',
  },
  half: {
    width: '48%', // Allows for a small gap between buttons
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  pressed: {
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
});

export default CMenuButton;