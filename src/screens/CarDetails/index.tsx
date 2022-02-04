
import { StatusBar } from 'react-native';
import { Accessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

interface ParamsProps {
    car: CarDTO
}

export function CarDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { car } = route.params as ParamsProps;

    function handleConfirmRental() {
        navigation.navigate('Agendamento', {
            car
        });
    }
    return (
        <Container>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <BackButton />
            </Header>
            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>

                </Details>
                <Accessories>
                    {
                        car.accessories.map(item => (
                            <Accessory
                                key={item.type}
                                name={item.name}
                                icon={getAccessoryIcon(item.type)} />
                        ))

                    }

                </Accessories>

                <About>
                    {car.about}
                </About>

            </Content>

            <Footer>
                <Button title='Escolher periodo do aluguel' onPress={handleConfirmRental} />
            </Footer>
        </Container>
    )
}