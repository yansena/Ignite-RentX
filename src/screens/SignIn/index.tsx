 import React, { useState } from 'react';
import * as Yup from 'yup';
import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/auth'
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';

import {RootStackParamList} from "../../routes/app.stack.routes";

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';

export function SignIn() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { signIn } = useAuth()


    async function  handleSignIn() {
        try{
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrigatória')
            });

            await schema.validate({ email, password })
            // Alert.alert('Tudo Certo')

            signIn({email, password});
        }catch (error){
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
            }
        }

    }

    function handleNewAccount() {
        navigation.navigate('FirstStep')
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>
                            Estamos {'\n'}quase lá
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button 
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            loading={false}
                            light
                        />
                    </Footer>
        
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}