import { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { LoadAnimated } from '../../components/LoadAnimated';
import { Car as ModelCar } from '../../database/models/Car';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';


interface dataProps {
    id: string
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<dataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isFocused = useIsFocused()

    useEffect(() => {
        async function fetchCars() {
            try {
                const res = await api.get('rentals');
                const dataFormatted = res.data.map((data: dataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }

                })
                setCars(dataFormatted)
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, [isFocused])
    return (
        <Container>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Header>

                <BackButton
                    color={theme.colors.shape}

                />
                <Title>
                    Escolha uma {`\n`}
                    data de início e {`\n`}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto
                    segurança e
                    praticidade
                </SubTitle>
            </Header>
            {loading ? <LoadAnimated /> : (

                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>PERIODO</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )
                        }
                    />
                </Content>
            )}

        </Container>
    )
}