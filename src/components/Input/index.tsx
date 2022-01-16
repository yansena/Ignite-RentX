import React, {useState} from "react";
import {Alert, TextInputProps} from "react-native";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons'

import { 
    Container,
    IconContainer,
    InputText,
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function Input({
    iconName,
    value,
    ...rest
} : Props) {
    const { colors, fonts } = useTheme();

    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return(
        <Container isFocused={isFocused}>
            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={ isFocused || isFilled ? colors.main : colors.text_details }
                />
            </IconContainer>

            <InputText
                {...rest}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
              
        </Container>
    );
}