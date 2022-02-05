import { Container } from "./styles";
import LottieView from 'lottie-react-native';
import lottieCar from '../../assets/lottieCar.json';

export function LoadAnimated() {

    return (
        <Container>
            <LottieView
                source={lottieCar}
                autoPlay
                style={{
                    height: 200
                }}
                resizeMode={'contain'}
                loop
            />
        </Container>
    )
}