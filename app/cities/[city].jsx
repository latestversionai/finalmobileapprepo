import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import flightService from '../../services/flightService';
import CustomScreen from '../../components/CustomScreen';
import CMenuButton from '../../components/CMenuButton';

const CityDetailScreen = () => {
  // Because the file is [city].jsx, the variable is 'city'
  const { city } = useLocalSearchParams(); 
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadAndFilter = async () => {
      try {
        const allData = await flightService.getAllFlights();
        const delay = (ms) => new Promise(res => setTimeout(res, ms))
        await delay(2000) //the premium "lull" effect
        // We filter based on the dynamic 'city' param
        const filtered = allData.filter(f => f.depCity === city);
        setFlights(filtered);
      } catch (err) {
        console.error("Error filtering flights:", err);
      } finally {
        setLoading(false);
      }
    };
    if (city) loadAndFilter();
  }, [city]);

  const renderFlightItem = ({ item }) => (
    <View style={[styles.flightCard, {alignContent:'center', backgroundColor:"#b9dad4b6"}]}>
      <Text style={[styles.routeText, {marginInlineStart:15}]}>To: {item.arrCity}</Text>
      <Text style={[styles.price, {marginInlineStart:140}]}>${item.priceOfTrip}</Text>
      <Text style={[styles.routeText, {marginInlineStart:230, color:'#736f6f'}]}>{item.dayOfTrip}</Text>
      <View style={styles.divider} />
    </View>
  );

  return (
    <CustomScreen>
      <Text style={styles.header}>Flights from {city}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={flights}
          keyExtractor={(item, index) => item?.tripId?.toString() || index.toString()}
          renderItem={renderFlightItem}
          ListEmptyComponent={<Text style={styles.empty}>No flights found for {city}.</Text>}
        />
      )}
      {!loading &&(
      <CMenuButton title=" <-- Back to Cities" onPress={() => router.back()} />)}
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: 'red', textTransform: 'capitalize' },
  flightCard: { padding: 15, marginBottom: 10 },
  routeText: { fontSize: 18, fontWeight: '600' },
  price: { color: 'green', fontWeight: 'bold', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#eee', marginTop: 10 },
  empty: { textAlign: 'center', marginTop: 50, color: '#666' }
});

export default CityDetailScreen;