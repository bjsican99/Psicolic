import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: 'Pantalla Principal'}}/>
        </Stack.Navigator>
    )
}
