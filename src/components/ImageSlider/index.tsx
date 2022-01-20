import React, { useState, useRef }from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage,
} from './styles';

import {Bullet} from "../Bullet";

interface Props {
    imagesUrl: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl } : Props) {

    const [ imageIndex, setImageIndex ] = useState(0)
    
    const indexChange = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index)
    })

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((_, index) => (
                        <Bullet
                            key={String(index)}
                            active={index === imageIndex} 
                        />

                    ))
                }
            </ImageIndexes>

            <FlatList 
                data={imagesUrl}
                keyExtractor={ key => key}
                renderItem={({item}) => (
                    <CarImageWrapper>
                        <CarImage source={{ uri: item }} resizeMode="contain"/>
                    </CarImageWrapper>

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChange.current}
            />
            

        </Container>
    );
}