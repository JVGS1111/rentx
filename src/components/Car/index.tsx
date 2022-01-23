
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

interface dataProps {
    brand: string;
    name: string;
    rent: {
        period: string
        price: number
    }
    thumbnail: string;
}

interface CarProps {
    data: dataProps
}

export function Car({ data }: CarProps) {
    return (
        <Container>
            <Detais>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Detais>

            <CarImage resizeMode='contain' source={{ uri: data.thumbnail }} />

        </Container>
    )
}