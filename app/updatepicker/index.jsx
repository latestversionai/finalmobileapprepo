const UpdatePickerScreen = () => {
  const { userId } = useAuth(); // Now we have the ID from your updated context!
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const fetchMyTrips = async () => {
      // This calls the backend with the userId filter
      const data = await flightService.getAllFlights(userId); 
      setUserTrips(data);
    };
    if (userId) fetchMyTrips();
  }, [userId]);

  return (
    <CustomScreen>
      <Text style={styles.header}>Select a flight to edit</Text>
      <FlatList 
        data={userTrips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CMenuButton 
            title={`${item.depCity} -> ${item.arrCity}`}
            onPress={() => router.push({
               pathname: '/flights/edit-form', // This will be your next screen
               params: { id: item.id } 
            })}
          />
        )}
      />
    </CustomScreen>
  );
};