import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from "react-native-gesture-handler";

import { 
    Container,
    IconContainer,
    InputText
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({
    iconName,
    ...rest
} : Props) {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(true);

    const { colors, fonts } = useTheme();

    function handlePasswordVisibilityChange(){
        setIsPasswordVisible(oldState => !oldState)
    }
    
    return(
        <Container>

            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={colors.text_details}
                />
            </IconContainer>

            <InputText {...rest} secureTextEntry={isPasswordVisible}/> 

            <BorderlessButton onPress={ handlePasswordVisibilityChange } >
                <IconContainer>
                    <Feather 
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={colors.text_details}
                    />
                </IconContainer>
            </BorderlessButton>
              
        </Container>
    );
}