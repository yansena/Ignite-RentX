import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import {FirstStep} from "../screens/SignUp/FirstStep";
import {CarDTO} from "../dtos/carDTO";


export type RootStackParamList = {
    SignIn: undefined;
    FirstStep: undefined;
    Home: undefined;
    CarDetails: { car: CarDTO};
    Scheduling: undefined;
    SchedulingDetails: undefined;
    SchedulingComplete: undefined;
    MyCars: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();


export function StackRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false
        }}
            initialRouteName="SignIn"
        >

            <Screen 
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="FirstStep"
                component={FirstStep}
            />
            <Screen 
                name="Home"
                component={Home}
                options={{ 
                    gestureEnabled: false
                }}
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />
            <Screen 
                name="Scheduling"
                component={Scheduling}
            />
            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            <Screen 
                name="SchedulingComplete"
                component={SchedulingComplete}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}