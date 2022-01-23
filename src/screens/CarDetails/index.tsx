
import { StatusBar } from 'react-native';
import { Accessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'


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
    Acessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';

export function CarDetails() {

    return (
        <Container>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <BackButton onPress={() => {
                    console.log('pressionado');
                }} />
            </Header>
            <CarImages>
                <ImageSlider imagesUrl={['https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png']} />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>

                </Details>
                <Acessories>
                    <Accessory name='380km/h' icon={SpeedSvg} />
                    <Accessory name='3.2s' icon={AccelerationSvg} />
                    <Accessory name='800 HP' icon={ForceSvg} />
                    <Accessory name='Gasolina' icon={GasolineSvg} />
                    <Accessory name='Auto' icon={ExchangeSvg} />
                    <Accessory name='2 pessoas' icon={PeopleSvg} />
                </Acessories>

                <About>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                </About>

            </Content>

            <Footer>
                <Button title='Confirm' />
            </Footer>
        </Container>
    )
}