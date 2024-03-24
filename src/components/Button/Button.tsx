// React Imports
import React, {FC} from 'react'

// React Native Imports
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native'

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void
  image?: ImageSourcePropType
  label: string
  labelColor?: string
  backgroundColor?: string
  borderWidth?: number
  borderColor?: string
}

export const Button: FC<ButtonProps> = ({
  onPress,
  image,
  label,
  labelColor = 'white',
  backgroundColor = 'transparent',
  borderWidth = 1,
  borderColor = 'transparent',
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor, borderWidth, borderColor}]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, {color: labelColor}]}>{label}</Text>
        {image && <Image source={image} style={styles.buttonIcon} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginVertical: 5,
    width: 327,
    height: 48,
    borderRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
})
