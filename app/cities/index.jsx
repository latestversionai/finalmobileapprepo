import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CityImages } from '../../constants/CityImages';
import CustomScreen from '../../components/CustomScreen';
import CMenuButton from '../../components/CMenuButton';
import flightService from '../../services/flightService';
import stylesCustom from '../../styles/styles';

const { width } = Dimensions.get('window');
const columnWidth = (width - 40) / 2; // Simple math for 2 columns with padding

const CityGridScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
  const getData = async () => {
    const data = await flightService.getAllFlights();
    setTrips(data || []);
  }
  getData();
}, [])
  // 1. Get unique departure cities from your trip data
  const uniqueCities = [...new Set(trips?.map(item => item.depCity))];

  const renderCityItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => {
  // This matches the [city].jsx filename
  router.push(`/cities/${item}`); 
}}
  >
    <Image 
      source={CityImages[item] || CityImages.Default} 
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.overlay}>
      <Text style={styles.cityName}>{item}</Text>
    </View>
  </TouchableOpacity>
);

  if (!loading && uniqueCities.length === 0) {
  return (
    <CustomScreen style={{backgroundColor:"black"}}>
      <Text style={styles.header}>Flights by city</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"black"}}>
        <Text>No cities found in the database.</Text>
      </View>
    </CustomScreen>
  );
}

  return (
    <CustomScreen style={{backgroundColor:"rgba(59, 255, 213, 0.71)"}}>
      <Text style={styles.header}>Flights by city</Text>
      <FlatList
        data={uniqueCities}
        renderItem={renderCityItem}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <CMenuButton 
        title="<-- Back (To Landing)" 
        onPress={() => router.back()} 
      />
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 24, color: 'red', textAlign: 'center', marginVertical: 20, fontWeight: 'bold' },
  row: { justifyContent: 'space-between', paddingHorizontal: 15 },
  card: {
    width: columnWidth,
    height: 150,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden', // Rounds the image corners
    backgroundColor: '#eee'
  },
  image: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', // Darkens image so text is readable
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cityName: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default CityGridScreen;