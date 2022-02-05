import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Accessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components/native';

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
    Footer
} from './styles';


import { CarDTO } from '../../dtos/CarDTO';


interface ParamsProps {
    car: CarDTO
}

export function CarDetails() {

    const navigation = useNavigation<any>();
    const route = useRoute();
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
                        <ImageSlider imagesUrl={car.photos} />
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
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>

                </Details>
                <Accessories>
                    {
                        car.accessories.map(item => (
                            <Accessory
                                key={item.type}
                                name={item.name}
                                icon={getAccessoryIcon(item.type)} />
                        ))

                    }

                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>

            </Animated.ScrollView>

            <Footer>
                <Button title='Escolher periodo do aluguel' onPress={handleConfirmRental} />
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