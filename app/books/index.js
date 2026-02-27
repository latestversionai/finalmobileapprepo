import { StyleSheet, Text, View, FlatList } from 'react-native'
import {Link} from 'expo-router'
import {useEffect, useState} from 'react'
import {bookData} from '../../fauxAPIbooks'
import CustomScreen from '../../components/CustomScreen'
import CustomText from '../../components/CustomText'

const index = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    // We would normally do an API call here to get the books
    setBooks(bookData)
  }, [])

  return (
    <CustomScreen>
  <FlatList
    data={books}
    renderItem={({item}) => <Link key={item.index} href={"/books/" + item.id}><CustomText>{item.title}</CustomText></Link>} />
</CustomScreen>
  )
}

export default index

const styles = StyleSheet.create({})