import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    BackButtonWrapper,
    Content,
    Footer
} from "./styles";

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps, generateInterval } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

import { getPlataformDate } from "../../utils/getPlataformDate";
import { format } from 'date-fns';
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriodProps {

    startFormatted: string;

    endFormatted: string;
}

interface ParamsProps {
    car: CarDTO
}

export function Agendamentos() {

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const navigation = useNavigation<any>();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as ParamsProps;


    function handleConfirmRental() {

        navigation.navigate('AgendamentoDetails', {
            car,
            dates: Object.keys(markedDates)
        });
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

    return (
        <Container>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <BackButtonWrapper>
                    <BackButton
                        color={theme.colors.shape}

                    />
                </BackButtonWrapper>

                <Title>
                    Escolha uma {`\n`}
                    data de início e {`\n`}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.startFormatted}</DateValue >
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue >
                    </DateInfo>

                </RentalPeriod>
            </Header>
            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    enable={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    )
}