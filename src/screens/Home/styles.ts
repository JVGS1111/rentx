import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton } from "react-native-gesture-handler";
import theme from "../../styles/theme";

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
`;

export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
})`

`;

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 30px;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom:13px;
    right: 22px;
`;