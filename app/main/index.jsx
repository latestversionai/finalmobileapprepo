import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import flightService from '../../services/flightService';
import CustomScreen from '../../components/CustomScreen';
import CMenuButton from '../../components/CMenuButton';
import stylesCustom from '../../styles/styles';
import { useEffect } from 'react';

const MainScreen = () => {
  const { userName, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    flightService.testConnection();
  }, []);

  return (
    <CustomScreen style={[stylesCustom.container, {backgroundColor: '#8fc9beb6'}]}>
      {/* Top Header Section */}
      <View style={styles.headerRow}>
        <Text style={[styles.userGreeting, {paddingTop:50, paddingRight:200}]}>{userName},</Text>
        <Pressable style={{paddingTop:1}} onPress={() => { logout(); router.replace('/'); }}>
          <Text style={styles.logoutText}>[Logout]</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainPrompt}>What would you like to do?</Text>

        {/* SEE SECTION */}
        <Text style={styles.sectionLabel}>See!</Text>
        <View style={styles.row}>
          <CMenuButton 
            title="See all flights" 
            halfWidth 
            onPress={() => router.push('/flights')} 
          />
          <CMenuButton 
            title="See Flights By City" 
            halfWidth 
            onPress={() => router.push('/cities')} 
          />
        </View>

        {/* ADD SECTION */}
        <Text style={styles.sectionLabel}>Add!</Text>
        <CMenuButton
          title="Add a new flight" 
          onPress={() => router.push('/flights/addflight')} 
        />

        {/* UPDATE SECTION */}
        <Text style={styles.sectionLabel}>Update!</Text>
        <CMenuButton 
          title="Update a flight" 
          onPress={() => router.push('/flights/updateflight')} 
        />
      </View>
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userGreeting: { fontSize: 20, fontWeight: '500' },
  logoutText: { fontWeight: 'bold', textDecorationLine: 'underline' },
  content: { flex: 1, alignItems: 'center' },
  mainPrompt: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  sectionLabel: { fontSize: 18, fontWeight: '600', marginTop: 15 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default MainScreen;