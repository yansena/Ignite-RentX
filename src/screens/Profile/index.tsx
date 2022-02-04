import React, {useState} from 'react';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    Photo,
    PhotoContainer,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';
import {useTheme} from "styled-components";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {useNavigation} from "@react-navigation/native";
import {Feather} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

import {useAuth} from "../../hooks/auth";
import {Input} from "../../components/Input";
import {PasswordInput} from "../../components/PasswordInput";
import {BackButton} from "../../components/BackButton";

export function Profile() {
    const { user, signOut } = useAuth();

    const { colors, fonts } = useTheme();
    const navigation = useNavigation();

    const [ option, setOption ] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [ avatar, setAvatar ] = useState(user.avatar);
    const [ name, setName ] = useState(user.name);
    const [ driverLicense, setDriverLicense ] = useState(user.driver_license);

    function handleBack() {
        navigation.goBack();
    };

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if(result.cancelled){
            return;
        }

        if(result.uri){
            setAvatar(result.uri);
        }
    }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>

                            <LogoutButton onPress={signOut} >
                                <Feather
                                    name="power"
                                    size={24}
                                    color={colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {!!avatar &&  <Photo source={{uri: avatar}}/> }
                            <PhotoButton onPress={handleSelectAvatar} >
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar Senha
                                </OptionTitle>
                            </Option>
                        </Options>

                        {
                            option === 'dataEdit' ?
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />
                                <Input
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email}
                                />
                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
                                />
                            </Section>
                        :
                            <Section>
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Senha Atual"
                                />
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Nova Senha"
                                />
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Repetir Senha"
                                />
                            </Section>

                        }
                    </Content>


                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}