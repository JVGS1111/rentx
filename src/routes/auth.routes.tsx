import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/Signin';
import { SignUpFirstStep } from '../screens/SingUp/SingUpFirstStep';
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Splash'}
        >
            <Screen
                name='Splash'
                component={Splash}
            />
            <Screen
                name='SignIn'
                component={SignIn}
            />
            <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />
            <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />

            <Screen
                name='Confirmation'
                component={Confirmation}
            />

        </Navigator>
    )
}