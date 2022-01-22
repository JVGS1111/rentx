
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

export function Car() {
    return (
        <Container>
            <Detais>
                <Brand>AUDI</Brand>
                <Name>RS 5 Coupé</Name>

                <About>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 120</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Detais>

            <CarImage source={{ uri: '' }} />
        </Container>
    )
}