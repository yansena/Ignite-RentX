import React from 'react';
import {Platform} from "react-native";
import {useTheme} from "styled-components";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {AppStackRoutes} from "./app.stack.routes";
import { MyCars } from '../screens/MyCars';
import {Profile} from "../screens/Profile";

import {CarDTO} from "../dtos/carDTO";
import HomeSvg from '../assets/home.svg';
import PeopleSvg from '../assets/people.svg';

import CarSvg from '../assets/car.svg';

export type RootStackParamList = {
    SignIn: undefined;
    Profile: undefined;
    FirstStep: undefined;
    SecondStep: { user: object };
    AppStackRoutes: undefined;
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

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();


export function AppTabRoutes(){
     const { colors } = useTheme()
    return(
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.main,
                tabBarInactiveTintColor: colors.text_details,
                tabBarShowLabel: false,
                headerStyle:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: colors.background_primary
                },
                headerShown: false
            }}
        >
            <Screen
                name="AppStackRoutes"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color}) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    )
                }}
            />
            <Screen
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({ color}) => (
                        <CarSvg width={24} height={24} fill={color} />
                    )
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color}) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    )
                }}
            />
        </Navigator>
    )
}