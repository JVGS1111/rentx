import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';

import { Containter, Header, TotalCars, HeaderContent, CarList } from './styles';

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/models/Car';
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database';
import { useNetInfo } from '@react-native-community/netinfo';

export function Home() {

    const [cars, setCars] = useState<ModelCar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const netInfo = useNetInfo();
    const navigation = useNavigation<any>();
    const synchronizing = useRef(false);
    function handleCarDeatails(car: ModelCar) {
        navigation.navigate('CarDetails', { car });
    }

    useEffect(() => {

        let isMounted = true;
        async function fetchCars() {
            try {
                const carCollection = database.get<ModelCar>('cars');
                const cars = await carCollection.query().fetch();


                if (isMounted) {
                    setCars(cars);
                }
            } catch (error) {
                console.log(error);
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

    useEffect(() => {
        const syncChanges = async () => {
            if (netInfo.isConnected && !synchronizing.current) {
                synchronizing.current = true;
                try {
                    await offlineSynchronize(); //Watermelon
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    synchronizing.current = false;
                }
            }
        }

        syncChanges();
    }, [netInfo.isConnected]);


    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                    .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = response.data;
                console.log('back para app', changes);

                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;

                await api.post('/users/sync', user);
            },
        });
    }
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
                        onPress={offlineSynchronize}
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
                    keyExtractor={(item: ModelCar) => item.id}
                    renderItem={({ item }: { item: ModelCar }) =>
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

