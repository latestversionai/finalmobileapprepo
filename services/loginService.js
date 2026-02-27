 const apiLogin = async () => {
    if(!email || !password){
      Alert.alert("Error", "Email or Password is empty")
      return;
    }
    setLoading(true)

    try{
      const response = await api.post("login", {email, password});
      const authHeader = response.headers['authorization'] || response.headers['Authorization'];
      if(authHeader){
        const token = authHeader.substring('Bearer '.length);
        await AsyncStorage.setItem("jwtToken", token)
        console.log("Token was saved...")
      }
      router.replace("/news");
    }catch(error){
      console.log(error);
      const errorMsg = error.response?.data?.message || "Invalid Login Alert!";
      Alert.alert("Login Failed", errorMsg);
    }finally{
      setLoading(false);
    }
  };

  export default apiLogin