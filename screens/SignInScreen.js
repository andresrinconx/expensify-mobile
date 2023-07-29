import { View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Back from '../components/Back'
import { colors } from '../theme'
import Snackbar from 'react-native-snackbar'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { setUserLoading } from '../redux/slices/user'

const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const handleSubmit = async () => {
      if (email && password) {
        // go to home
        // navigation.goBack()
        // navigation.navigate('HomeScreen')

        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'CERRAR',
                  textColor: 'green',
                  onPress: () => { Snackbar.dismiss() },
                },
              });
        }
        
      } else {
        // show error
        Snackbar.show({
            text: 'El correo y la contraseña son necesarios',
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
                            Iniciar Sesion
                        </Text>
                    </View>

                    <View className='flex-row justify-center my-3 mt-5'>
                        <Image style={{width: 250, height: 250,}}
                            source={require('../assets/images/login.png')}
                        />
                    </View>

                    <View className='space-y-2'>
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Correo
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text className={`${colors.heading} text-lg font-bold`}>
                            Contraseña
                        </Text>
                        <TextInput
                            className='p-4 bg-white rounded-full mb-3'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity
                          onPress={() => ''}
                        >
                            <Text className='text-green-500 text-base text-right'>¿Olvidate la contraseña?</Text>
                        </TouchableOpacity>
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
                                onPress={handleSubmit}
                            >
                                <Text className='color-white text-center font-bold text-lg'>
                                    Iniciar Sesion
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

export default SignInScreen