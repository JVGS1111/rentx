import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ToastAndroid
} from "react-native";
import { useTheme } from "styled-components/native";
import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from "./styles";
import { Button } from '../../components/Button';
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import * as Yup from 'yup';
import { useAuth } from "../../hooks/auth";

export function SignIn() {

    const theme = useTheme();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();

    async function handleSignIn() {

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrigatoria')
            });

            await schema.validate({ email, password })

            //fazer login
            await signIn({ email, password });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {

                ToastAndroid.show(`Opa!, ${err.message}`, 3000)
            } else {
                console.log(err);

                ToastAndroid.show('Erro na autenticação Ocorreu um erro ao fazer login, verifique as credenciais', 4000)
            }
        }
    }
    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }
    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
            style={{
                backgroundColor: theme.colors.shape,
                flex: 1
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>


                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            color={
                                theme.colors.background_primary
                            }
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}