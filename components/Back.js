import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { colors } from '../theme'

const Back = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity className='bg-white rounded-full h-8 w-8'
      onPress={ () => navigation.goBack() }
    >
        <ChevronLeftIcon size={30} color={colors.button} />
    </TouchableOpacity>
  )
}

export default Back