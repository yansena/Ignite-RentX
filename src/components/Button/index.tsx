import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    enabled?: boolean;
    loading?: boolean;
    light?: boolean;
}

export function Button({
    title,
    color,
    enabled = true,
    loading = false,
    light = false, 
    ...rest
}: Props) {
    const { colors, fonts } = useTheme();


    return (
        <Container 
            {...rest} 
            color={color}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
        >
            {
                loading ?
                <ActivityIndicator color={colors.shape} />
                :
                <Title light={light}>
                    {title}
                </Title>
            }
        </Container>
    );
}