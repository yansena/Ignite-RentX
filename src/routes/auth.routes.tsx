import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import {FirstStep} from "../screens/SignUp/FirstStep";
import {SecondStep} from "../screens/SignUp/SecondStep";
import { Confirmation } from '../screens/Confirmation';

import {CarDTO} from "../dtos/carDTO";

export type RootStackParamList = {
    Splash: undefined;
    SignIn: undefined;
    FirstStep: undefined;
    SecondStep: { user: object };
    Home: undefined;
    CarDetails: { car: CarDTO};
    Scheduling: { car: CarDTO};
    SchedulingDetails: undefined;
    Confirmation: {
        nextScreenRoute: string;
        title: string;
        message: string;
    };
    MyCars: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();


export function AuthRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
            <Screen 
                name="Splash"
                component={Splash}
            />
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="FirstStep"
                component={FirstStep}
            />
            <Screen
                name="SecondStep"
                component={SecondStep}
            />
            <Screen 
                name="Confirmation"
                component={Confirmation}
            />
        </Navigator>
    )
}