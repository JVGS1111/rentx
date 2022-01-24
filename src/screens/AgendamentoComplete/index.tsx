import {
    Container,
    Content,
    Title,
    Message,
    ConfirmationButtonWrapper
} from "./styles";
import { useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmationButton } from "../../components/ConfirmButton";

export function AgendamentoComplete() {

    const { width } = useWindowDimensions();
    return (
        <Container>
            <LogoSvg
                width={width}
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
                    <ConfirmationButton title="OK" />
                </ConfirmationButtonWrapper>
            </Content>

        </Container>
    )

}