import { View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Back from '../components/Back'
import { colors } from '../theme'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'
import { setUserLoading } from '../redux/slices/user'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'

const AddTripScreen = () => {
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(state => state.user)

    const navigation = useNavigation()

    const handleAddTrip = async () => {
      if (city && country) {
        // go to home
        // navigation.navigate('HomeScreen')
        setLoading(true)
        let doc = await addDoc(tripsRef, {
            city,
            country,
            userId: user.uid
        })
        setLoading(false)
        if (doc && doc.id) navigation.goBack()
      } else {
        // show error
        Snackbar.show({
            text: 'La ciudad y el pais son necesarios',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'CERRAR',
              textColor: 'green',
              onPress: () => { Snackbar.dismiss() },
            },
          });
      }
    }

  return (
    <View className='flex-1 justify-between h-full mt-2 px-5'>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >

            <View className='h-screen flex justify-between'>
                <View>
                    <View className='relative mt-5'>
                        <View className='absolute top-0 left-0'>
                            <Back />
                        </View>

                        <Text className={`${colors.heading} font-bold text-center text-xl mx-10`}>
                            Añadir Viaje
                        </Text>
                    </View>

                    <View className='flex-row justify-center my-3 mt-5'>
                        <Image style={{width: 250, height: 250,}}
                            source={require('../assets/images/4.png')}
                        />
                    </View>

                    <View className='space-y-2'>
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Ciudad
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={city}
                            onChangeText={setCity}
                        />
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Pais
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={country}
                            onChangeText={setCountry}
                        />
                    </View>
                </View>

                <View>
                    {
                        loading
                          ? (
                            <Loading />
                          ) : (
                            <TouchableOpacity className='my-6 rounded-full p-3 shadow-sm mx-2'
                                style={{backgroundColor: colors.button}}
                                onPress={handleAddTrip}
                            >
                                <Text className='color-white text-center font-bold text-lg'>
                                    Añadir Viaje
                                </Text>
                            </TouchableOpacity>
                          )
                    }
                    
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default AddTripScreen