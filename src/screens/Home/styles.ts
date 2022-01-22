import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Containter = styled.View`

    flex: 1;
    color: ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.line};
    
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;
    background-color: ${({ theme }) => theme.colors.header};

    justify-content: flex-end;
    padding: 32px 24px;
`
export const HeaderContent = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;

    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
`