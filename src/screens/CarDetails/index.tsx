import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Accessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components/native';
import { Car as ModelCar } from '../../database/models/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,

} from 'react-native-reanimated';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo
} from './styles';


import { CarDTO } from '../../dtos/CarDTO';
import { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import api from '../../services/api';


interface ParamsProps {
    car: ModelCar
}

export function CarDetails() {
    const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
    const navigation = useNavigation<any>();
    const route = useRoute();

    const netInfo = useNetInfo();
    const { car } = route.params as ParamsProps;
    const scrollY = useSharedValue(0);
    const theme = useTheme();
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    })
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    })
    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 100],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })
    function handleConfirmRental() {
        navigation.navigate('Agendamento', {
            car
        });
    }

    useEffect(() => {
        async function fetchOnlineData() {
            const response = await api.get(`cars/${car.id}`);
            setCarUpdate(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchOnlineData();
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}

            >
                <Header >
                    <BackButton />
                </Header>
                <Animated.View
                    style={sliderCarsStyleAnimation}
                >
                    <CarImages>
                        <ImageSlider
                            imagesUrl={
                                !!carUpdate.photos ?
                                    carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                            }

                        />
                    </CarImages>

                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                onScroll={scrollHandler}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
                    </Rent>

                </Details>
                {
                    carUpdate.accessories &&
                    <Accessories>
                        {
                            carUpdate.accessories.map(accessory => (
                                <Accessory
                                    key={accessory.type}
                                    name={accessory.name}
                                    icon={getAccessoryIcon(accessory.type)}
                                />
                            ))
                        }
                    </Accessories>
                }

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>

            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher periodo do aluguel'
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    )
}


const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
})