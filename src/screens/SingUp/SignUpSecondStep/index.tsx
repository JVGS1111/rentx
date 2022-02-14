import {
    KeyboardAvoidingView,
    Keyboard,
    ToastAndroid
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicence: string;
    }
}
export function SignUpSecondStep() {
    const navigation = useNavigation<any>();
    const theme = useTheme();
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const { user } = route.params as Params;

    function handleRegister() {
        if (!password || !passwordConfirmed) {
            return ToastAndroid.show('Informe a senha', 3000);
        }
        if (password != passwordConfirmed) {
            return ToastAndroid.show('As senhas não são iguais', 3000);
        }

        navigation.navigate('Confirmation', {
            nextScreenRoute: 'SignIn',
            title: 'Conta Criada!',
            message: `Agora é só fazer login \n e aproveitar`
        })
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <Container>
                    <Header>
                        <BackButton />
                        <Steps>
                            <Bullet active={true} />
                            <Bullet />
                            <Bullet />
                        </Steps>

                    </Header>
                    <Title>
                        Crie sua {'\n'}
                        conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            value={password}
                            onChangeText={setPassword}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                            value={passwordConfirmed}
                            onChangeText={setPasswordConfirmed}
                        />
                    </Form>
                    <Button
                        title='Continuar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}