import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {Colors} from '../Theme'
import Spacer from "../components/Spacer"
import { Button } from 'react-native-web'
import CustomButton from '../components/CustomButton'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"#81a58e", fontSize:30, paddingBottom:10, paddingTop:80, fontFamily:"fantasy"}}>frugalFlights</Text>
      <Image source={require('../assets/frontpageplane.jpg')} style={{ width: '50%', height: 140 }} />
      <Spacer/>
      <View style={{flexDirection:'row', columnGap: 10}}>
        <Link href="/(auth)/login" asChild style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
          <CustomButton style={{height:50}}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>[ Login ]</Text>
          <Ionicons name="airplane-outline" size={20} color="white" style={{alignSelf: 'center'}} />
          </CustomButton >
        </Link>
          
        <Link href="/(auth)/register" asChild style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
          <CustomButton style={{height:50}}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>[ Register ]</Text>
          <Ionicons name="airplane-outline" size={20} color="white" style={{alignSelf: 'center'}} />
          </CustomButton>
        </Link>
      </View>
    </View>
  )
}

export default Home

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
  container: {
    flex:1,
    padding:50,
    justifyContent: 'flex-start', // Centers vertically
    alignItems: 'center',     // Centers horizontally
    backgroundColor: '#beded8b6',
  },
  image: {
    width: 150,
    height: 150,
  },

});