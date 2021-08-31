// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importar los screens
import Home from './screens/Home';

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Pantalla Principal'}}/>
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