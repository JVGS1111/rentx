
import { StatusBar } from 'react-native';
import { Containter, Header, TotalCars, HeaderContent, CarList } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export function Home() {

    const carData = {
        brand: 'audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 20.00
        },
        thumbnail: 'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png'
    }

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
            <CarList
                data={[1, 2, 3, 6, 7, 8]}
                keyExtractor={item => String(item)}
                renderItem={(item) => <Car data={carData} />}
            />

        </Containter>
    )
}