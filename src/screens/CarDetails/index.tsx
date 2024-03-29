import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import Animated, { 
    useSharedValue, 
    useAnimatedScrollHandler, 
    useAnimatedStyle, 
    interpolate,
    Extrapolate
} from 'react-native-reanimated';


import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import {RootStackParamList} from "../../routes/app.stack.routes";

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';


import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';

import { CarDTO } from '../../dtos/carDTO';

export interface Params {
    car: CarDTO;
}

export function CarDetails() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { car } = route.params as Params;
    const { colors } = useTheme();

    const scrollY = useSharedValue(0)
    const scrollHandle = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return{
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarStyleAnimated = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value, 
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRental(){
        navigation.navigate('Scheduling', { car });
    }

    function handleBack(){
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar 
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View style={[
                headerStyleAnimation, 
                styles.header,
                {backgroundColor: colors.background_secondary}
            ]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <Animated.View style={sliderCarStyleAnimated}>
                    <CarImages>
                        <ImageSlider imagesUrl={car.photos} />
                    </CarImages>
                </Animated.View>

            </Animated.View>


            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,

                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandle}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory 
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessories>

                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})