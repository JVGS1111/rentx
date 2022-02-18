import { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";
import {
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage
} from "./styles";

interface ImageSliderProps {
    imagesUrl: objs[]

}
interface objs {
    id: string;
    photo: string;
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
                        <Bullet
                            key={index}
                            active={currentImage === index}
                        />
                    ))
                }


            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key.id}
                renderItem={({ item }: { item: objs }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item.photo }}
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