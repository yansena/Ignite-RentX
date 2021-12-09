import React ,{ useEffect, useState }from 'react';
import { StatusBar, StyleSheet } from 'react-native'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler
} from 'react-native-reanimated';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api }  from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';


import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';


const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {

    const [ cars, setCars ] = useState<CarDTO[]>([]);
    const [ loading, setLoading ] = useState(true);

    const navigation = useNavigation();

    const { colors, fonts} = useTheme();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(){

        },
        onActive(event){
            positionX.value = event.translationX
            positionY.value = event.translationY
        },
        onEnd(){

        }
    });


    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car })
    }

    function handleOpenMyCar(){
        navigation.navigate('MyCars')
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    },[]);
    
    // console.log(cars);

    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)}/>

                    <TotalCars>
                        Total de {cars.length} Carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            {
                loading ? <Load /> :
                <CarList 
                    data={cars}
                    keyExtractor= {item => item.id}
                    renderItem={({item}) => 
                        <Car data={item} onPress={() => handleCarDetails(item)}/> 
                    }
                />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated 
                        onPress={handleOpenMyCar}
                        style={[styles.button, { backgroundColor: colors.main }]}
                    >
                        <Ionicons name="ios-car-sport"  size={32} color={colors.shape}/>
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>

        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})