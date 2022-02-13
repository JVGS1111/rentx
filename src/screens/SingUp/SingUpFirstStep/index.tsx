import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ToastAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';
import * as Yup from 'yup';


export function SignUpFirstStep() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [driverLicense, setDriverLicense] = useState("0");

    const navigation = useNavigation<any>();

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome é obrigatorio'),
                email: Yup.string()
                    .email('E-mail invalido')
                    .required('E-mail é obrigatorio'),
                driverLicense: Yup.string()
                    .required('CNH é obrigatorio')
            });

            const data = { name, email, driverLicense };

            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                return ToastAndroid.show(`Opa, ${err.message}`, 3000)
            }
        }

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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            value={driverLicense}
                            onChangeText={setDriverLicense}
                        />

                    </Form>
                    <Button
                        title='Próximo'
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}