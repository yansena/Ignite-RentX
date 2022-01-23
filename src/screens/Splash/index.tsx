import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../routes/app.stack.routes";

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

const width = Dimensions.get('window').width;

import {
    Container
} from './styles';

interface Props {

}

export function Splash() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            transform: [
                {   
                    translateX: interpolate(splashAnimation.value,
                       [0, 50],
                       [50, 200],
                       Extrapolate.CLAMP
                    ),
                }
            ]
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, 
                [0, 25, 50], 
                [0, .3, 1],
                Extrapolate.CLAMP
            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [60, -30],
                        Extrapolate.CLAMP
                    ),
                }
            ]
        }
    });

    function startApp(){
        navigation.navigate('SignIn')
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 1500 },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        );
    },[])

    return (
        <Container >
          <Animated.View style={brandStyle}>
              <BrandSvg width={80} height={50} />
          </Animated.View>

          <Animated.View style={logoStyle}>
              <LogoSvg width={180} height={20} />
          </Animated.View>
            
        </Container>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})