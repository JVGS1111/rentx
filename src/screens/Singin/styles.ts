import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from "react-native-responsive-fontsize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
    padding: 0 24px;

    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 100}px;

`

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;

    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(15)}px;

    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue(25)}px;

    margin-top: 16px;
`


export const Footer = styled(GestureHandlerRootView)`
    
`;

export const Form = styled.View`
    width: 100%;
    margin: 48px 0;
`