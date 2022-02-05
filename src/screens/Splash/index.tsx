import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS
} from "react-native-reanimated";
import { Container } from "./styles";

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";



export function Splash() {
    const navigation = useNavigation<any>();
    const splashAnimation = useSharedValue(0);// de 0 ate 50

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    })

    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 1000 },
            () => {
                'worklet'
                runOnJS(startApp)();

            }
        )
    }, [])

    function startApp() {
        navigation.navigate('Home');
    }

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>
            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    )
}
