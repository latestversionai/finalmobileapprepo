import { View } from 'react-native'

const Spacer = ({ width = "20%", height = 20 }) => {
  return (
    <View style={{ width, height }} />
  )
}

export default Spacer