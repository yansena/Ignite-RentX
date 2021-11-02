import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerarionSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
    Acessories,
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

export function SchedulingDetails() {
    
    const { colors, fonts } = useTheme();

    const navigation = useNavigation();

    function handleConfirmScheduling(){
        navigation.navigate('SchedulingComplete');
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={() => {}} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={['https://img1.gratispng.com/20171220/kiq/audi-png-car-image-5a3b1f1eb47de9.9104985015138240307393.jpg']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Accessory name="380Km/h" icon={speedSvg}/>
                    <Accessory name="3.2s" icon={accelerarionSvg}/>
                    <Accessory name="800 HP" icon={forceSvg}  />
                    <Accessory name="Gasolina" icon={gasolineSvg}  />
                    <Accessory name="Automatico" icon={exchangeSvg}  />
                    <Accessory name="2 pessoas" icon={peopleSvg}  />
                </Acessories>

                <RentalPeriod>

                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(24)} color={colors.shape}/>
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>19/10/21</DateValue>
                    </DateInfo>

                    <Feather name="chevron-right" size={RFValue(10)} color={colors.text}/>

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>29/10/21</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diarias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title="Alugar Agora" onPress={handleConfirmScheduling} color={colors.success}/>
            </Footer>
        </Container>
    );
}