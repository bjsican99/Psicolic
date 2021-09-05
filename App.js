// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importar los screens
import Home from './screens/Home';
import Chatbot from './screens/Chatbot';
import Information from './screens/Information';
import Login from './screens/account/Login';
import Register from './screens/account/Register';
import Account from './screens/account/Account';
import userGuest from './screens/account/userGuest';
import userLogged from './screens/account/userLogged';
import Recomend from './screens/Recomend';

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{title: "Acceder a tu Cuenta"}}/>
      <Stack.Screen name="Register" component={Register} options={{title: "Crea una Nueva Cuenta"}}/>
      <Stack.Screen name="Home" component={Home} options={{title: 'Pantalla Principal'}}/>
      <Stack.Screen name="Chatbot" component={Chatbot} options = {{title: 'Conversación con una IA'}}/>
      <Stack.Screen name="Information" component={Information} options = {{title: 'Informacion Sobre La APP'}}/>
      <Stack.Screen name="Recomend" component={Recomend} options = {{title: 'Recomendaciones Generales.'}}/>
      <Stack.Screen name="Account" component={Account} options = {{title: 'Mi Cuenta'}}/>
      <Stack.Screen name="userGuest" component={userGuest} options = {{title: 'Mi Cuenta'}}/>
      <Stack.Screen name="userLogged" component={userLogged} options = {{title: 'Mi Cuenta'}}/>
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <HomeScreen></HomeScreen>
    </NavigationContainer>
  );
}