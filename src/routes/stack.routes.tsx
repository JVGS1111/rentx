import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Agendamentos } from '../screens/Agendamentos';
import { AgendamentoDetails } from '../screens/AgendamentoDetails';
import { Confirmation } from '../screens/Confirmation';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/Signin';
import { SignUpFirstStep } from '../screens/SingUp/SingUpFirstStep';
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'SignIn'}
        >
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
            {/* <Screen
                name='Splash'
                component={Splash}
            /> */}
            <Screen
                name='Home'
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Screen
                name='CarDetails'
                component={CarDetails}
            />
            <Screen
                name='Agendamento'
                component={Agendamentos}
            />
            <Screen
                name='AgendamentoDetails'
                component={AgendamentoDetails}
            />
            <Screen
                name='Confirmation'
                component={Confirmation}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
        </Navigator>
    )
}