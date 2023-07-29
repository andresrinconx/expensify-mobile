import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyList = ({message}) => {
  return (
    <View className='flex-1 justify-center items-center my-5 space-y-3'>
        <Image style={{width: 180, height: 180,}}
          source={require('../assets/images/empty.png')}
        />
        <Text className=''>
            {message || 'No se encontraron viajes'}
        </Text>
    </View>
  )
}

export default EmptyList