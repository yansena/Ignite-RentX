import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons'

import { 
    Container,
    IconContainer,
    InputText,
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({
    iconName,
    ...rest
} : Props) {
    const { colors, fonts } = useTheme();
    
    return(
        <Container>

            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={ colors.text_details }
                />
            </IconContainer>

            <InputText {...rest}/>
              
        </Container>
    );
}