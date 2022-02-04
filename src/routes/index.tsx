import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useAuth} from "../hooks/auth";
import { AppStackRoutes } from './app.stack.routes'
import {AppTabRoutes} from "./app.tab.routes";
import {AuthRoutes} from "./auth.routes";


export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            { user.id ? <AppTabRoutes/> : <AuthRoutes/>}
        </NavigationContainer>
    );
}