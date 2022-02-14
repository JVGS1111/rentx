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
import { useNavigation, useRoute } from "@react-navigation/native";

interface ConfirmationParams {

    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const navigation = useNavigation<any>();
    const route = useRoute();

    const { title, message, nextScreenRoute } = route.params as ConfirmationParams;

    function handleConfirmComplete() {
        navigation.navigate(nextScreenRoute);
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
                <Title>{title}</Title>

                <Message>
                    {message}
                </Message>
                <ConfirmationButtonWrapper>
                    <ConfirmationButton title="OK" onPress={handleConfirmComplete} />
                </ConfirmationButtonWrapper>
            </Content>

        </Container>
    )

}