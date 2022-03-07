import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

import { Car } from "../database/model/Car";
import {CarDTO} from "../dtos/carDTO";

export type RootStackParamList = {
    Splash: undefined;
    SignIn: undefined;
    FirstStep: undefined;
    SecondStep: { user: object };
    Home: undefined;
    CarDetails: { car: Car};
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


export function AppStackRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name="Home"
                component={Home}
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
                name="Confirmation"
                component={Confirmation}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}