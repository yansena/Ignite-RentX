import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car'
import { api } from '../../services/api';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/carDTO';
import { RootStackParamList } from "../../routes/app.stack.routes";


import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles';

export function Home() {
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);
    const netInfo = useNetInfo();
    const synchronizing = useRef(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleCarDetails(car: ModelCar) {
        navigation.navigate('CarDetails', { car });
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                    .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = response.data;

                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                if (user) {
                    await api.post('/users/sync', user);
                }
            },
        });

        await fetchCars();
    }

    async function fetchCars() {
        try {
            const carCollection = database.get<ModelCar>('cars');
            const cars = await carCollection.query().fetch();

            setCars(cars);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        let isMounted = true;
    
        if (isMounted) {
          fetchCars();
        }
    
        return () => {
          isMounted = false;
        };
      }, []);


    useFocusEffect(useCallback(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;

        try {
          await offlineSynchronize();
        }
        catch (err) {
          console.log(err);
        }
        finally {
          synchronizing.current = false;
        }
      }
    }

    syncChanges();
  }, [netInfo.isConnected]));


    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />

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
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Car data={item} onPress={() => handleCarDetails(item)} />
                        }
                    />
            }



        </Container>
    );
}