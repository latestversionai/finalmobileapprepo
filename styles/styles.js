import { StyleSheet } from 'react-native';

const stylesCustom = StyleSheet.create({
  // Main container for all screens
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#beded8b6', // Light grey background
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  // Style for all TextInputs
  inputContainer: {
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  // Main Submit/Sign Up Button
  submitBtn: {
    backgroundColor: '#007AFF', // Standard Blue
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Link at the bottom (e.g., "Already have an account?")
  backLink: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  // Helpful for error text or labels
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginLeft: 5,
  }
});

export default stylesCustom;