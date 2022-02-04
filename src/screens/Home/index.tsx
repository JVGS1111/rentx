
import { StatusBar, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { Containter, Header, TotalCars, HeaderContent, CarList, MyCarsButton } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const navigation = useNavigation<any>();

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

                    <TotalCars>
                        Total de Carros
                    </TotalCars>
                </HeaderContent>

            </Header>
            {isLoading ? <Load /> :
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
            <MyCarsButton
                onPress={handleOpenMyCars}
            >
                <Ionicons
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Containter>
    )
}