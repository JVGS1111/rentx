import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { Containter, Header, TotalCars, HeaderContent, CarList } from './styles';

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';


export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<any>();

    function handleCarDeatails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    useEffect(() => {

        let isMounted = true;
        async function fetchCars() {
            try {
                setIsLoading(true);
                const { data } = await api.get<CarDTO[]>('/cars');

                if (isMounted) {
                    setCars(data);
                }
            } catch (err) {
                console.log(err);

            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }

        }
        fetchCars();

        return () => {
            isMounted = false;
        }
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

        </Containter>
    )
}

