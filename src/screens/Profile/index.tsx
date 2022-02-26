import { useState } from "react";
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";
import Toast from 'react-native-simple-toast';
import { useTheme } from "styled-components/native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from "../../components/Button";
import { useNetInfo } from "@react-native-community/netinfo";
import SimpleToast from "react-native-simple-toast";


type optionProps = 'dataEdit' | 'passwordEdit';

export function Profile() {
    const { user, signOut, updateUser } = useAuth();

    const [option, setOption] = useState<optionProps>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    const theme = useTheme();
    const netInfo = useNetInfo();

    function handleOptionChange(optionSelected: optionProps) {
        if (!netInfo.isConnected === true && optionSelected === 'passwordEdit') {
            return SimpleToast.show(`Não é possivel atualizar offline`, 3000);
        }
        setOption(optionSelected);
    }

    async function handleSelectAvatarImg() {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if (res.cancelled) {
            return
        }

        if (res.uri) {
            setAvatar(res.uri);
        }
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatória')
            });

            const data = { name, driverLicense };

            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            })
            Toast.show(`Perfil atualizado!`, 3000);

        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                return Toast.show(`Opa ${String(err)}`, 3000);
            }
            console.log(err);

            Toast.show('Não foi possível atualizar o perfil', 3000);
        }
    }

    async function handleSignOut() {

        Alert.alert(
            'Tem certeza ?',
            'Se você sair, irá precisar de internet para se conectar novamente.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { },
                },
                {
                    text: "Sair",
                    onPress: async () => await signOut()
                }
            ]
        )

    }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleSelectAvatarImg}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                onPress={() => handleOptionChange('dataEdit')}
                                active={option === 'dataEdit'}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option >
                        </Options>
                        {
                            option == 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName="user"
                                        placeholder="Nome"
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName="mail"
                                        editable={false}
                                        defaultValue={user.email}
                                    />
                                    <Input
                                        iconName="credit-card"
                                        placeholder="CNH"
                                        keyboardType="numeric"
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />

                                </Section>
                                :
                                <Section>
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Senha atual"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Nova senha"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Repetir senha"
                                    />
                                </Section>

                        }
                        <Button
                            title="Salvar alterações"
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}