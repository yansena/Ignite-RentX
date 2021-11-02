import React from 'react';
import { useTheme } from 'styled-components';

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


import ArrowSvg from '../../assets/arrow.svg'

import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';

interface Props {

}

export function Scheduling() {

    const { colors } = useTheme();

    const navigation = useNavigation();

    function handleConfirmRental(){
        navigation.navigate('SchedulingDetails');
    }

    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={() => {}} color={colors.shape}/>

                <Title>
                    Escolha uma {'\n'} 
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>

                        </DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue selected={false}>

                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>


        </Container>
    );
}