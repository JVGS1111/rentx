import {
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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


export function SignUpSecondStep() {
    const navigation = useNavigation<any>();
    const theme = useTheme();

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
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                        />
                    </Form>
                    <Button
                        title='Continuar'
                        color={theme.colors.success}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}