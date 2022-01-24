import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ConfirmationButtonProps extends RectButtonProps {
    title: string;
}
export function ConfirmationButton({ title, ...rest }: ConfirmationButtonProps) {

    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}