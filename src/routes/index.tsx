import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';
import { AppTabRoutes } from './app.tab.routes';
import { LoadAnimated } from '../components/LoadAnimated';

export function Routes() {

    const { user, loading } = useAuth();
    console.log(!!user);

    return (
        loading ? <LoadAnimated /> : (
            <NavigationContainer>
                {user.token ? <AppTabRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        )

    )
}