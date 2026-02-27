import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import flightService from '../../services/flightService'; // Your service
import CustomScreen from '../../components/CustomScreen';
import CMenuButton from '../../components/CMenuButton';
import stylesCustom from '../../styles/styles';
import { Colors } from '../../Theme';

const AllFlightsScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await flightService.getAllFlights();
      setTrips(data);
    } catch (error) {
      console.error("Failed to load trips:", error);
    } finally {
      setLoading(false);
    }
  };

  // This matches the "gray lines" in your design plan
  const renderTripItem = ({ item }) => (
    <View style={[styles.tripContainer,{backgroundColor: '#7dbbafb6', padding:5}]}>
      <View style={[styles.tripRow, {backgroundColor: '#7dbbafb6'}]}>
        <Text style={styles.cityText}>{item.depCity}</Text>
        <Text style={styles.planeEmoji}>✈️</Text>
        <Text style={styles.cityText}>{item.arrCity}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailText}>{item.dayOfTrip}</Text>
        <Text style={styles.priceText}>${item.priceOfTrip}</Text>
      </View>
      <View style={styles.grayLine} />
    </View>
  );

  return (
    <CustomScreen styles={[stylesCustom.container, {backgroundColor:"black"}]}>
      <Text style={styles.header}>see all flights</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
  data={trips}
  // This version checks if tripId exists first
  keyExtractor={(item, index) => item?.tripId?.toString() || index.toString()}
  renderItem={renderTripItem}
          ListEmptyComponent={<Text style={styles.empty}>No flights found.</Text>}
          contentContainerStyle={styles.listPadding}
        />
      )}

      {/* Matching the "Back (To Landing)" button in your sketch */}
      <CMenuButton 
        title="<-- Back (To Landing)" 
        onPress={() => router.back()}
        style={{}}
      />
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: '#34f8cd',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
    textTransform: 'lowercase',
  },
  tripContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityText: { fontSize: 18, fontWeight: '600' },
  planeEmoji: { fontSize: 18 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailText: { color: '#666' },
  priceText: { color: 'green', fontWeight: 'bold' },
  grayLine: {
    height: 1,
    backgroundColor: '#ccc', // The gray divider from your sketch
    marginTop: 15,
  },
  listPadding: { paddingBottom: 20 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default AllFlightsScreen;