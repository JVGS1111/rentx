import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Agendamentos } from '../screens/Agendamentos';
import { AgendamentoDetails } from '../screens/AgendamentoDetails';
import { AgendamentoComplete } from '../screens/AgendamentoComplete';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { Singin } from '../screens/Singin';
import { SignUpFirstStep } from '../screens/SingUp/SingUpFirstStep';
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Singin'}
        >
            <Screen
                name='Singin'
                component={Singin}
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
                name='AgendamentoComplete'
                component={AgendamentoComplete}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
        </Navigator>
    )
}