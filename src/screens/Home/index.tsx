import React ,{ useEffect, useState }from 'react';
import { StatusBar, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';
import { api }  from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';
import {RootStackParamList} from "../../routes/app.stack.routes";


import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles';

export function Home() {
    const [ cars, setCars ] = useState<CarDTO[]>([]);
    const [ loading, setLoading ] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars(){
            try {
                const response = await api.get('/cars');
                if(isMounted){
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if(isMounted){
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return() => {
            isMounted = false;
        };
    },[]);


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

                    {
                        !loading && 
                        <TotalCars>
                                Total de {cars.length} Carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>
            {
                loading ? <LoadAnimation /> :
                <CarList 
                    data={cars}
                    keyExtractor= {item => item.id}
                    renderItem={({item}) => 
                        <Car data={item} onPress={() => handleCarDetails(item)}/> 
                    }
                />
            }



        </Container>
    );
}