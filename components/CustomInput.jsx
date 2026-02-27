import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({placeholder, style, ...props}) => {
  return(
    <View style={[styles.container, style]}>
      <TextInput style={styles.input} placeholder={placeholder}
       placeholderTextColor="rgba(0, 0, 0, 0.4)" {...props}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '50%',
    height: '06%'
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
})

export default CustomInput