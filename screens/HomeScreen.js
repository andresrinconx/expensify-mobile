import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/EmptyList'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { doc, getDocs, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'


const HomeScreen = () => {
  const navigation = useNavigation()

  const {user} = useSelector(state => state.user)
  const [trips, setTrips] = useState([])

  const isFocused = useIsFocused()

  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", user.uid)) // query son los documentos de una coleccion
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc => {
        // console.log('document: ', doc.data())
        data.push({...doc.data(), id: doc.id})
    })
    setTrips(data)
  }

  useEffect(() => {
    if (isFocused) {
        fetchTrips()
    }
  }, [isFocused])

  const handleLogOut = async () => {
    await signOut(auth)
  }
    
  return (
    <View className='flex-1 mt-2 px-3'>

        <View className='flex-row justify-between items-center'>
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
                Expensify
            </Text>
            <TouchableOpacity className='p-2 px-3 bg-white border border-gray-200 rounded-full'
                onPress={ () => '' }
            >
                <Text className={`${colors.heading} font-bold`}
                    onPress={handleLogOut}
                >
                    Cerrar Sesion
                </Text>
            </TouchableOpacity>
        </View>

        <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mb-4 mt-2'>
            <Image style={{width: 250, height: 250,}}
                source={require('../assets/images/banner.png')}
            />
        </View>

        <View>
            <View className='flex-row justify-between items-center'>
                <Text className={`${colors.heading} font-bold text-xl`}>
                    Viajes Recientes
                </Text>
                <TouchableOpacity className='p-2 px-3 bg-white border border-gray-200 rounded-full'
                  onPress={ () => navigation.navigate('AddTripScreen') }
                >
                    <Text className={`${colors.heading}`}>
                        Añadir viaje
                    </Text>
                </TouchableOpacity>
            </View>

            <View className='mt-3' style={{height: 430, paddingBottom: 20}}>
                <FlatList
                    data={trips}
                    numColumns={2}
                    ListEmptyComponent={ () => <EmptyList message={"No has agregado viajes aun"} /> }
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ // estilos a cada fila cuando el flexbox cuando numColumns > 1
                        justifyContent: 'space-between',
                    }}
                    className='mx-1' // a todo el flatlist
                    keyStractor={ (item) => item.id }
                    renderItem={ ({item}) => {
                        return (
                            <TouchableOpacity className='bg-white p-3 mb-3 shadow-xl'
                              onPress={ () => navigation.navigate('TripExpensesScreen', {...item}) }
                            >
                                <View>
                                    <Image style={{width: 150, height: 150,}}
                                      source={randomImage()}
                                    />
                                    <Text className={`${colors.heading} font-bold`}>{item.city}</Text>
                                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }} 
                />
            </View>
        </View>

    </View>
  )
}

export default HomeScreen