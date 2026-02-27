import { Pressable, StyleSheet } from 'react-native'
import { Colors} from '../Theme'

function CustomButton({ onPress, children, disabled, style, ...props }) {

  return (
    
    <Pressable
    onPress={onPress}
    disabled={disabled}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
      >
        {children}
    </Pressable>
  )
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 12,
    height:"01%",
    alignItems:'center',
    justifyContent:'center'
  },
  
  pressed: {
    opacity: 0.5
  },
})

export default CustomButton