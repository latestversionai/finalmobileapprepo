import React, { useState, useEffect } from 'react'; // <--- MUST HAVE
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // Path depends on your folder depth
import flightService from '../../services/flightService';
import CustomScreen from '../../components/CustomScreen';
import CMenuButton from '../../components/CMenuButton';



const UpdateFlightScreen = () => {
  const { userId } = useAuth(); 
  const [trips, setTrips] = useState([]); // Now this will work!
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only fetch if we have a userId
    if (userId) {
      loadMyTrips();
    }
  }, [userId]);

  const loadMyTrips = async () => {
    try {
      // Remember: we are passing userId to filter the list!
      const data = await flightService.getFlightsByUser();
      //console.log("Full data response: ", data)
      setTrips(data.allTrips || []);
    } catch (error) {
      console.error("Load failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomScreen>
      <Text style={styles.header}>Select a flight to edit</Text>
      <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, {alignSelf:'center', color:'gray'}]}>{"<-- Back (To Landing)"}</Text>
        </TouchableOpacity>
      <View style={{flex:1}}>
        <FlatList 
        data={trips} // Changed from userTrips to match your state
        keyExtractor={(item, index) => item?.tripId?.toString() || index.toString()}
  // ... rest of props
   renderItem={({ item }) => (
          <CMenuButton 
            title={`${item.depCity} -> ${item.arrCity} ($${item.priceOfTrip})`}
            onPress={() => {
  console.log("Full Item Object:", item); // This will show all property names
  const possibleId = item.tripId || item.tripid || item.id;
  console.log("Detected ID:", possibleId);
  router.push(`/flights/${possibleId}`);
    }}/>
        )}
      />
      </View>
          </CustomScreen>
  );
};

export default UpdateFlightScreen;


const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
    textTransform: 'lowercase', // Matching your "see all flights" style
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  // If you decide to use a custom View instead of CMenuButton for the items:
  tripItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // The "gray line" from your design
  },
  tripText: {
    fontSize: 18,
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  }
});