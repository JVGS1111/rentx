import { useState } from "react";
import { useTheme } from "styled-components/native";
import {
    Container,
    InputText,
    IconContainer,
} from "./styles";
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: InputProps) {
    const theme = useTheme();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }
    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);

    }

    const [isHidden, setIsHidden] = useState(true);

    function handleIsHidden() {
        setIsHidden(!isHidden);
    }
    return (
        <Container

        >
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />

            </IconContainer>

            <InputText
                secureTextEntry={isHidden}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                isFocused={isFocused}
                autoCorrect={false}
                {...rest}
            />
            <BorderlessButton
                onPress={handleIsHidden}
            >
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isHidden ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>

        </Container>
    )
}