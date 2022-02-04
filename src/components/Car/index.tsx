
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


interface CarProps extends RectButtonProps {
    data: CarDTO
}

export function Car({ data, ...rest }: CarProps) {
    const MotorIcon = getAccessoryIcon(data.fuel_type)
    return (
        <Container {...rest}>
            <Detais>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
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