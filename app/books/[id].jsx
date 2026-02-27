import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";

// Add these imports
import {bookData} from '../../fauxAPIbooks'
import {useState, useEffect} from 'react'

const BookDetails = () => {

  const {id} = useLocalSearchParams();

  // Add book state (initialize to an empyt obj)
  const [book, setBook] = useState({});

  // Add useEffect to get the book that matches the id
  useEffect(() => {
    // You might do an API call to get the book from the backend here
    setBook(bookData.find(b => b.id === id))
  }, [])

  return (
    <CustomScreen>

      /////// Modify the elements inside the CustomScreen element
      <CustomText title>{book.title}</CustomText>
      <CustomText>{book.author}</CustomText>
      <Text>{book.summary}</Text>

    </CustomScreen>
  )
}

export default BookDetails

const styles = StyleSheet.create({})