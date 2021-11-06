import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { format } from 'date-fns'
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPlatformDate } from '../../utils/getPlataformDate';

import ArrowSvg from '../../assets/arrow.svg'

import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';

interface RentalPeriod {
    start: number;
    starFormatted: string;
    end: number;
    endFormatted: string;
}

export function Scheduling() {
    const [ lastSelectedData, setLastSelectedData ] = useState<DayProps>({} as DayProps);
    const [ markedDates, setMarkedDates ] = useState<MarkedDatesProps>({} as MarkedDatesProps)
    const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);

    const { colors } = useTheme();

    const navigation = useNavigation();

    function handleConfirmRental(){
        navigation.navigate('SchedulingDetails');
    }

    function handleBack(){
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedData.timestamp ? date : lastSelectedData;
        let end = date;

        if( start.timestamp > end.timestamp ){
            start = end;
            end = start;
        }

        setLastSelectedData(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);
        
        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: start.timestamp,
            end: end.timestamp,
            starFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })

    }

    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleBack} color={colors.shape}/>

                <Title>
                    Escolha uma {'\n'} 
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.starFormatted}>
                            {rentalPeriod.starFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>


        </Container>
    );
}