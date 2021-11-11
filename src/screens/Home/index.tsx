import React ,{ useEffect, useState }from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api }  from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

export function Home() {

    const [ cars, setCars ] = useState<CarDTO[]>([]);
    const [ loading, setLoading ] = useState(true);

    const navigation = useNavigation();

    const { colors, fonts} = useTheme();


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
    
    console.log(cars);

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
                        <Car data={item} onPress={() => handleCarDetails(item)}/> 
                    }
                />
            }

            <MyCarsButton onPress={handleOpenMyCar} >
                <Ionicons name="ios-car-sport"  size={32} color={colors.shape}/>
            </MyCarsButton>
        </Container>
    );
}