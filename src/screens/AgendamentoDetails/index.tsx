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
interface ParamsProps {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function AgendamentoDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const { car, dates } = route.params as ParamsProps;
    const [loading, setLoading] = useState(false);

    const rentTotal = Number(dates.length * car.rent.price);
    useEffect(() => {
        setRentalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    }, []);

    async function handleConfirmRental() {
        const agendamentoByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...agendamentoByCar.data.unavailable_dates,
            ...dates,
        ]
        try {
            setLoading(true);
            await api.put(`/schedules_bycars/${car.id}`, {
                id: car.id,
                unavailable_dates
            })
            await api.post(`/schedules_byuser`, {
                user_id: 1,
                car,
                startDate: rentalPeriod.start,
                endDate: rentalPeriod.end,
            })

            navigation.navigate('AgendamentoComplete');
        } catch (err) {
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
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>

                </Details>
                <Accessories>
                    {
                        car.accessories.map(item => (
                            <Accessory
                                key={item.type}
                                name={item.name}
                                icon={getAccessoryIcon(item.type)}
                            />
                        ))
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
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enable={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    )
}