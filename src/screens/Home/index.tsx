import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Containter, Header, TotalCars, HeaderContent, CarList } from './styles';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Ionicons } from '@expo/vector-icons';

import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const navigation = useNavigation<any>();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })
    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value
        },
        onActive(event, ctx: any) {
            positionX.value = event.translationX + ctx.positionX;
            positionY.value = event.translationY + ctx.positionY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);

        }
    });

    function handleCarDeatails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }


    useEffect(() => {
        async function fetchCars() {
            try {
                setIsLoading(true);
                const { data } = await api.get<CarDTO[]>('/cars');
                setCars(data);
            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false);
            }
        }
        fetchCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    })
    return (
        <Containter>
            <StatusBar
                barStyle='light-content'
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {
                        !isLoading && (
                            <TotalCars>
                                Total de {cars.length} carros
                            </TotalCars>
                        )}
                </HeaderContent>

            </Header>
            {isLoading ? <LoadAnimated /> :
                <CarList
                    data={cars}
                    keyExtractor={(item: CarDTO) => item.id}
                    renderItem={({ item }: { item: CarDTO }) =>
                        <Car
                            data={item}
                            onPress={() => { handleCarDeatails(item) }}
                        />
                    }
                />
            }
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle, {
                            position: 'absolute',
                            bottom: 23,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>


            </PanGestureHandler>

        </Containter>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})