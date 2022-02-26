
import {
    Container,
    Detais,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from "./styles";
import GasolineSvg from '../../assets/gasoline.svg'
import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Car as ModelCar } from '../../database/models/Car';
import { useNetInfo } from "@react-native-community/netinfo";

interface CarProps extends RectButtonProps {
    data: ModelCar
}

export function Car({ data, ...rest }: CarProps) {
    const MotorIcon = getAccessoryIcon(data.fuel_type)
    const netInfo = useNetInfo();

    return (
        <Container {...rest}>
            <Detais>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? data.price : '...'}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Detais>

            <CarImage resizeMode='contain' source={{ uri: data.thumbnail }} />

        </Container>
    )
}