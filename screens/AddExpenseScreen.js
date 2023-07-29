import { View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Back from '../components/Back'
import { colors } from '../theme'
import { categories } from '../constants'
import Snackbar from 'react-native-snackbar'
import Loading from '../components/Loading'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'

const AddExpenseScreen = ({route}) => {
    const { id, country, city } = route.params
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const handleAddExpense = async () => {
      if (title && amount && category) {
        // go to home
        // navigation.goBack()
        setLoading(true)
        let doc = await addDoc(expensesRef, {
            title,
            amount,
            category,
            tripId: id
        })
        setLoading(false)
        if (doc && doc.id) navigation.goBack()
      } else {
        // show error
        Snackbar.show({
            text: 'El titulo, el precio y la categoria son necesarios',
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
                            Añadir Gasto
                        </Text>
                    </View>

                    <View className='flex-row justify-center my-3 mt-5'>
                        <Image style={{width: 250, height: 250,}}
                            source={require('../assets/images/expenseBanner.png')}
                        />
                    </View>

                    <View className='space-y-2'>
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Gasto en...
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            ¿Cuanto?
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>
                    <View className=''>
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Categoria
                        </Text>
                        <View className='flex-row flex-wrap items-center'>
                            {
                                categories.map((cat) => {
                                    let bgColor = 'bg-white'
                                    if (cat.value == category) bgColor = 'bg-green-200'
                                    return (
                                        <TouchableOpacity className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}
                                            key={cat.value}
                                            onPress={() => setCategory(cat.value)}
                                        >
                                            <Text className=''>{cat.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
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
                                onPress={handleAddExpense}
                            >
                                <Text className='color-white text-center font-bold text-lg'>
                                    Añadir Gasto
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

export default AddExpenseScreen