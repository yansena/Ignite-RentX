import React ,{ useEffect, useState }from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api }  from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

export function Home() {

    const [ cars, setCars ] = useState<CarDTO[]>([]);
    const [ loading, setLoading ] = useState(true);

    const navigation = useNavigation();

    const carData = {
        brand: "audi",
        name: "RS 5 Coupe",
        rent: {
            period: 'ao dia',
            price: 120
        },
        thumbnail: 'https://img1.gratispng.com/20171220/kiq/audi-png-car-image-5a3b1f1eb47de9.9104985015138240307393.jpg'
    }

    function handleCarDetails(){
        navigation.navigate('CarDetails')
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
    },[])

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
            {
                loading ? <Load /> :
                <CarList 
                    data={cars}
                    keyExtractor= {item => item.id}
                    renderItem={({item}) => 
                        <Car data={item} onPress={handleCarDetails}/> 
                    }
                />
            }
        </Container>
    );
}