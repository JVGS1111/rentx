import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Agendamentos } from '../screens/Agendamentos';
import { AgendamentoDetails } from '../screens/AgendamentoDetails';
import { AgendamentoComplete } from '../screens/AgendamentoComplete';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {

    return (
        <Navigator
            screenOptions={{ headerShown: false }}
        >
            <Screen
                name='Home'
                component={Home}
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