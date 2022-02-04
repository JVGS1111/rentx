import {
    Container,
    Content,
    Title,
    Message,
    ConfirmationButtonWrapper
} from "./styles";
import { StatusBar, useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmationButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export function AgendamentoComplete() {
    const navigation = useNavigation<any>();


    function handleConfirmComplete() {
        navigation.navigate('Home');
    }
    const { width } = useWindowDimensions();
    return (
        <Container>
            <LogoSvg
                width={width}
            />
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel
                </Message>
                <ConfirmationButtonWrapper>
                    <ConfirmationButton title="OK" onPress={handleConfirmComplete} />
                </ConfirmationButtonWrapper>
            </Content>

        </Container>
    )

}