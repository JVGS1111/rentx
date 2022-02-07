import { StatusBar } from "react-native";
import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,

} from "./styles";
import { Button } from '../../components/Button';
import { useTheme } from "styled-components/native";

export function Singin() {
    const theme = useTheme();
    return (
        <Container>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={'transparent'}
                translucent
            />
            <Header>
                <Title>
                    Estamos {`\n`}quase lá
                </Title>
                <SubTitle>
                    Faça seu login para começar {`\n`}
                    uma experiência incrível.
                </SubTitle>
            </Header>



            <Footer>
                <Button
                    title="Login"
                    onPress={() => {

                    }}
                    enable={false}
                    loading={false}
                />
                <Button
                    title="Criar conta gratuita"
                    onPress={() => {

                    }}
                    enable={false}
                    loading={false}
                    color={
                        theme.colors.background_primary
                    }
                    light
                />
            </Footer>
        </Container>
    )
}