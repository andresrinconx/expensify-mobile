import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../config/firebase'

GoogleSignin.configure({
  webClientId: '930992140365-505jo9lqqj05mo3cmpo5dgk0ure3hbtj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  
});

const WelcomeScreen = () => {
  const navigation = useNavigation()

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
      console.log('here')
    } catch (error) {
      console.log('got error: ',error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('1')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('2')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('3')
      } else {
        // some other error happened
        console.log('4', error)
      }
    }
  };

  return (
    <View className='flex-1 mt-2 px-3'>
      <View className='flex-row justify-center mt-10'>
        <Image style={{width: 400, height: 400,}}
          source={require('../assets/images/12.png')}
        />
      </View>
      <View className='mx-5 mb-20'>
        <Text className='text-center font-bold text-4xl mb-10'>Expensify</Text>
        <TouchableOpacity className='shadow p-3 rounded-full mb-5'
          style={{backgroundColor: colors.button,}}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          <Text className='text-center text-white text-lg font-bold'>Iniciar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity className='shadow p-3 rounded-full mb-5'
          style={{backgroundColor: colors.button,}}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text className='text-center text-white text-lg font-bold'>Registrarse</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity className='shadow-2xl p-3 rounded-full mb-5 bg-white'
          onPress={() => signIn()}
        >
          <View className='flex-row justify-center space-x-3 items-center'>
            <Image style={{width: 40, height: 40,}}
              source={require('../assets/images/googleIcon.png')}
            />
            <Text className='text-center text-gray-600 text-lg font-bold'>Iniciar Sesion con Google</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default WelcomeScreen