import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Splash'}
        >

            <Screen
                name='Home'
                component={Home}
            />
            <Screen
                name='Profile'
                component={Home}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
        </Navigator>
    )
}