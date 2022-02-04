
import { Container } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps extends BorderlessButtonProps {
    color?: string;
}

export function BackButton({ color, ...rest }: BackButtonProps) {
    const theme = useTheme();
    const navigation = useNavigation<any>();

    function handelGoBack() {
        navigation.goBack();
    }
    return (
        <Container {...rest} onPress={handelGoBack}>
            <MaterialIcons
                name="chevron-left"
                size={24}
                color={
                    color ? color : theme.colors.text
                }
            />
        </Container>
    )
}