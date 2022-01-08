import React from 'react';
import LottieView from 'lottie-react-native';
import load_animated from '../../assets/load_animated.json';

import {
    Container
} from './styles';

interface Props {

}

export function LoadAnimation() {
    return (
        <Container>
            <LottieView 
                source={load_animated}
                style={{ height:200 }}
                resizeMode='contain'
                autoPlay
                loop
            />
        </Container>
    );
}