import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user';

import HomeScreen from '../screens/HomeScreen'
import AddTripScreen from '../screens/AddTripScreen'
import TripExpensesScreen from '../screens/TripExpensesScreen'
import AddExpenseScreen from '../screens/AddExpenseScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  const {user} = useSelector(state=> state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    // console.log('got user: ',u);
    dispatch(setUser(u));
  })

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen'>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name='AddTripScreen' component={AddTripScreen} options={{headerShown: false}} />
          <Stack.Screen name='TripExpensesScreen' component={TripExpensesScreen} options={{headerShown: false}} />
          <Stack.Screen name='AddExpenseScreen' component={AddExpenseScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen'>
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown: false, presentation: 'modal'}} />
          <Stack.Screen name='SignInScreen' component={SignInScreen} options={{headerShown: false, presentation: 'containedModal'}} />
        </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

export default App