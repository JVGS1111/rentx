import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};

    padding-top: 90px;
`;

export const Content = styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
    right: 0;
    left: 0;
    top: 50%;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    color:${({ theme }) => theme.colors.shape}; 
    font-family: ${({ theme }) => theme.fonts.secondary_600};

    margin-top: 20px;
`;

export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    color:${({ theme }) => theme.colors.text_detail}; 
    font-family: ${({ theme }) => theme.fonts.primary_400};
    text-align: center;
    line-height: ${RFValue(25)}px;
    padding-top: 16px;
`;

export const ConfirmationButtonWrapper = styled.View`
    width: 100%;
    align-items: center;

    margin-top: 40px;
`;