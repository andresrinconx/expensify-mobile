
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux'; // Proporciona el store a toda la app, envuelve todos los demas
import AppNavigation from './navigation/appNavigation';
import { store } from './redux/store'; // store contiene el estado global de la app

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
   
  );
}


export default App;
