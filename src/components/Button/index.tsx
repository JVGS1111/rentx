
import { useTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler'
import {
    Container,
    Title
} from './styles'

interface ButtonProps extends RectButtonProps {
    title: string;
    color?: string;
    enable?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    color,
    enable = true,
    loading = false,
    ...rest

}: ButtonProps) {
    const theme = useTheme();
    return (
        <Container
            {...rest}
            color={color}
            enabled={enable}
            style={{ opacity: (enable === false || loading === true) ? .5 : 1 }}
        >
            {
                loading ? <ActivityIndicator color={theme.colors.shape} />
                    : <Title>{title}</Title>
            }
        </Container>
    )
}