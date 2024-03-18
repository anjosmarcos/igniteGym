import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from "@components/Buton";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
    email: string;
    password: string;
}

const singInSchema = yup.object({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Informe o senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),

})

export function SingIn() {
    const {signIn} = useAuth()

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(singInSchema)
    })

    function handleNewAccount() {
        navigation.navigate("SingUp")
    }

    function handleAcess({ email, password }: FormDataProps) {
       signIn(email, password)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center
                    my={24}
                >

                    <LogoSvg />

                    <Text
                        color="gray.100"
                        fontSize="sm"
                    >
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>

                    <Heading
                        color="gray.100"
                        fontSize="xl"
                        fontFamily="heading"
                        mb={6}
                    >
                        Acesse sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />


                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleAcess)}
                    />


                </Center>

                <Center mt={24}>
                    <Text
                        color="gray.100"
                        fontSize="sm"
                        mt={3}
                        fontFamily="body"
                    >
                        Ainda não tenho acesso
                    </Text>

                    <Button
                        title="Criar conta"
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>

            </VStack>
        </ScrollView>
    )
}