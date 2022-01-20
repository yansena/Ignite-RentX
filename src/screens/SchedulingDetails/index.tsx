import React , { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../routes/stack.routes";

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerarionSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { api } from '../../services/api';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlataformDate';

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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal
} from './styles';
import { Button } from '../../components/Button';
import { Calendar } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/carDTO';
interface Params {
    car: CarDTO;
    dates: string[];
}
interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const [ loading, setLoading ] = useState(false);
    const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
    
    const { colors, fonts } = useTheme();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const route = useRoute();
    const { car, dates  } = route.params as Params;

    const rentTotal = Number(dates.length * car.rent.price)

    function handleBack(){
        navigation.goBack();
    }

    async function handleConfirmScheduling(){
        setLoading(true);
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        });

        await api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        }).then(() => navigation.navigate('Confirmation', {
            nextScreenRoute: 'Home',
            title: 'Carro Alugado',
            message: `Agora você só precisa ir\naté a concessionária da RentX\npegar o seu automóvel`
        }))
        .catch(() => {
            setLoading(false)
            Alert.alert('Nao foi possivel confirmar o agendamento')
        })
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    },[])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period> {car.rent.period} </Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accesory => (
                            <Accessory 
                                key={accesory.type}
                                name={accesory.name}
                                icon={getAccessoryIcon(accesory.type)}
                            />

                        ))
                    }
                </Accessories>

                <RentalPeriod>

                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(24)} color={colors.shape}/>
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather name="chevron-right" size={RFValue(10)} color={colors.text}/>

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>
                            {
                                `R$ ${car.rent.price} x${dates.length} diarias`
                            }
                        </RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal},00</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button 
                    title="Alugar Agora" 
                    onPress={handleConfirmScheduling} 
                    color={colors.success}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}