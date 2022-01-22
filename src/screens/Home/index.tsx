
import { StatusBar } from 'react-native';
import { Containter, Header, TotalCars, HeaderContent } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export function Home() {
    return (
        <Containter>
            <StatusBar
                barStyle='light-content'
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    <TotalCars>
                        Total de Carros
                    </TotalCars>
                </HeaderContent>

            </Header>
            <Car />
        </Containter>
    )
}