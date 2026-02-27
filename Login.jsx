import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import Logo from './assets/icon.png';
import CustomScreen from './components/CustomScreen';
import CustomText from './components/CustomText';
import Spacer from './components/Spacer';
import CustomButton from './components/CustomButton';   

export default function App() {
  return (
    <CustomScreen>
      <Image source={Logo} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <CustomText title>Your App Name</CustomText>
      <Text>Welcome to your app!</Text>
      <Spacer height={40} />
      <CustomText style={styles.label}>Email</CustomText>
      <TextInput placeholder="Enter your email" style={styles.input} />
      <CustomText style={styles.label}>Password</CustomText>
      <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry />

      

      
      <CustomButton
        style={{margin: 20, width: '80%'}}
        onPress={() => console.log('Custom Button Pressed!')}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Custom Button</Text>
      </CustomButton>

      
      <View style={{flexDirection:'row', columnGap: 10}}>
        <CustomButton onPress={() => console.log('Custom Button Pressed!')}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Custom Button</Text>
        </CustomButton>
        <CustomButton onPress={() => console.log('Custom Button Pressed!')}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Custom Button</Text>
        </CustomButton>
      </View>

      <StatusBar style="auto" />
    </CustomScreen>
  );
}

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