import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../routes/app.stack.routes";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';


import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import {Feather} from "@expo/vector-icons";

interface Params{
    title: string;
    message: string;
    nextScreenRoute: any;
}

export function Confirmation() {
    const { width } = useWindowDimensions();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { title, message, nextScreenRoute } = route.params as Params;


    function handleConfirm(){
        navigation.navigate(nextScreenRoute);
    }
    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>

                <Message>
                    {message}.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>

        </Container>
    );
}