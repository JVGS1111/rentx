
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
import { Feather } from '@expo/vector-icons';

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
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetail,
    RentalPriceQuota,
    RentalPriceTotal,
    Acessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';

export function AgendamentoDetails() {

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
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/02/22</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/02/22</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title='Confirm' />
            </Footer>
        </Container>
    )
}