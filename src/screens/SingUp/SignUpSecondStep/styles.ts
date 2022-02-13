import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`

    padding: 0 24px;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    margin-top: ${getStatusBarHeight() + 31}px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};

    margin-top: 60px;
    margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};


`;

export const Form = styled.View`
    width: 100%;
    margin-top: 32px;
    margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: 12px;
    
`
