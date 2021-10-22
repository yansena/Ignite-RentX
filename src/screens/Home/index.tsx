import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList
} from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

export function Home() {

    const carData = {
        brand: "audi",
        name: "RS 5 Coupe",
        rent: {
            period: 'ao dia',
            price: 120
        },
        thumbnail: 'https://img1.gratispng.com/20171220/kiq/audi-png-car-image-5a3b1f1eb47de9.9104985015138240307393.jpg'
    }

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
                        Total de 12 Carros
                    </TotalCars>
                </HeaderContent>
            </Header>
                <CarList 
                    data={[1,2,3,4,5,6,7]}
                    keyExtractor= {item => String(item)}
                    renderItem={({item}) => 
                        <Car data={carData}/>
                    }
                />
        </Container>
    );
}