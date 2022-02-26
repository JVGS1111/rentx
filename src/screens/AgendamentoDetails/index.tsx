import { useEffect, useState } from 'react';
import theme from '../../styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Alert, StatusBar } from 'react-native';
import { Accessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { MarkedDateProps } from '../../components/Calendar';

import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetail,
    RentalPriceQuota,
    RentalPriceTotal,
    Accessories,
    Footer
} from './styles';



import { getPlataformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import date from '@nozbe/watermelondb/decorators/date';
import { useAuth } from '../../hooks/auth';
interface ParamsProps {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function AgendamentoDetails() {
    const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
    const navigation = useNavigation<any>();
    const route = useRoute();
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const { car, dates } = route.params as ParamsProps;
    const [loading, setLoading] = useState(false);
    const netInfo = useNetInfo();
    const rentTotal = Number(dates.length * car.price);
    const { user } = useAuth();
    useEffect(() => {
        setRentalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    }, []);
    useEffect(() => {
        async function fetchOnlineData() {
            const response = await api.get(`cars/${car.id}`);
            setCarUpdate(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchOnlineData();
        }
    }, [netInfo.isConnected])

    async function handleConfirmRental() {

        try {

            setLoading(true);
            api.defaults.headers.common = {
                Authorization: `bearer ${user.token}`,
            }
            await api.post(`rentals`, {
                user_id: 1,
                car_id: car.id,
                start_date: new Date(dates[0]),
                end_date: new Date(dates[dates.length - 1]),
                total: rentTotal
            })

            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro Alugado!',
                message: `Agora você só precisa ir \naté a concessionária da RENTX \npegar o seu automóvel`
            });
        } catch (err) {
            console.log(err);

            Alert.alert('Não foi possivel finalizar o agendamento');
            setLoading(false);
        }
    }

    return (
        <Container>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <BackButton />
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={
                        !!carUpdate.photos ?
                            carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>

                </Details>
                <Accessories>
                    {
                        car.accessories &&
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

                </Accessories>
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    )
}