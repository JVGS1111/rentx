import { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage
} from "./styles";

interface ImageSliderProps {
    imagesUrl: string[];

}
interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setCurrentImage(index);
    })

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((_, index) => (
                        <ImageIndex
                            key={index}
                            active={currentImage === index}
                        />
                    ))
                }


            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                renderItem={({ item }: { item: string }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode='contain'
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
            />


        </Container>
    )
}