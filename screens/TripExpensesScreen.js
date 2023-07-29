import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/EmptyList'
import Back from '../components/Back'
import ExpenseCard from '../components/ExpenseCard'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'

const TripExpensesScreen = ({route}) => {
    const { city, country, id } = route.params
    const navigation = useNavigation()

    const [expenses, setExpenses] = useState([])

    const isFocused = useIsFocused()

    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id))
        const querySnapshot = await getDocs(q)
        let data = []
        querySnapshot.forEach(doc => {
            // console.log('document: ', doc.data())
            data.push({...doc.data(), id: doc.id})
        })
        setExpenses(data)
    }
    
    useEffect(() => {
        if (isFocused) {
            fetchExpenses()
        }
    }, [isFocused])
    
  return (
    <View className='flex-1 mt-2 px-3'>
        <View className=''>
            <View className='relative mt-5'>
                <View className='absolute top-0 left-0'>
                    <Back />
                </View>

                <View className='flex items-center mx-20'>
                    <Text className='font-bold text-xl'>
                        {city}
                    </Text>
                    <Text className='font-semibold text-base'>
                        {country}
                    </Text>
                </View>
            </View>
            <View className='flex-row justify-center items-centerrounded-xl mb-4 mt-2'>
                <Image style={{width: 300, height: 300,}}
                    source={require('../assets/images/7.png')}
                />
            </View>
            <View>
                <View className='flex-row justify-between items-center'>
                    <Text className={`${colors.heading} font-bold text-xl`}>
                        Gastos
                    </Text>
                    <TouchableOpacity className='p-2 px-3 bg-white border border-gray-200 rounded-full'
                        onPress={ () => navigation.navigate('AddExpenseScreen', {id, country, city}) }
                    >
                        <Text className={`${colors.heading}`}>
                            Añadir gasto
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className='mt-3' style={{height: 430, paddingBottom: 20}}>
                    <FlatList
                        data={expenses}
                        ListEmptyComponent={ () => <EmptyList message={"No has agregado gastos aun"} /> }
                        showsVerticalScrollIndicator={false}
                        keyStractor={ (item) => item.id }
                        renderItem={ ({item}) => {
                            return (
                                <ExpenseCard item={item} />
                            )
                        }} 
                    />
                </View>
            </View>
        </View>
    </View>
  )
}

export default TripExpensesScreen