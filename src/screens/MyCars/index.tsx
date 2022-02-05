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

interface CarProps {
    car: CarDTO;
    id: string;
    user_id: string;
    startDate: string;
    endDate: string;
}
export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();


    useEffect(() => {
        async function fetchCars() {
            try {
                const res = await api.get('schedules_byuser?user_id=1');

                setCars(res.data)
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, [])
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
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
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