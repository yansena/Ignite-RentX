import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle
} from "./styles";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";

import {RootStackParamList} from "../../../routes/stack.routes";


export function FirstStep(){

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleBack() {
        navigation.goBack()
    }

    return(
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
                <Steps>
                    <Bullet active/>
                    <Bullet />
                </Steps>
            </Header>

            <Title>
                Crie sua {'\n'}
                conta
            </Title>
            <SubTitle>
                Faça seu cadastro de{'\n'}
                forma rápida de fácil
            </SubTitle>
        </Container>
    );
}