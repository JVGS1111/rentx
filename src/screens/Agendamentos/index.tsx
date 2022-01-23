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
import { Calendar } from "../../components/Calendar";

export function Agendamentos() {
    const theme = useTheme();
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
                        onPress={() => {
                            console.log('pressionado');
                        }}
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
                        <DateValue selected={true}>18/02/21</DateValue >
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}></DateValue >
                    </DateInfo>

                </RentalPeriod>


            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" />
            </Footer>
        </Container>
    )
}