import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';
import { AppTabRoutes } from './app.tab.routes';

export function Routes() {

    const { user } = useAuth();
    console.log(!!user);

    return (
        <NavigationContainer>
            {user.token ? <AppTabRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}