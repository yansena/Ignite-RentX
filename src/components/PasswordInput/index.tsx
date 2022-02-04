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
    value?: string
}

export function PasswordInput({
    iconName,
    value,
    ...rest
} : Props) {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(true);

    const { colors, fonts } = useTheme();

    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);


    function handlePasswordVisibilityChange(){
        setIsPasswordVisible(oldState => !oldState)
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!value)
    }
    
    return(
        <Container>

            <IconContainer isFocused={isFocused}>
                <Feather 
                    name={iconName}
                    size={24}
                    color={isFocused || isFilled ? colors.main : colors.text_details}
                />
            </IconContainer>

            <InputText
                {...rest}
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                autoCorrect={false}
            />

            <BorderlessButton onPress={ handlePasswordVisibilityChange } >
                <IconContainer isFocused={isFocused}>
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