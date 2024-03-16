import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from "@components/Buton";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const singUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o email').email('Email inválido'),
    password: yup.string().required('Informe o senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: yup.string().oneOf([, yup.ref('password')], 'As senhas devem ser iguais')
})

export function SingUp() {
    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(singUpSchema)
    })

    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSingUp({name, email, password, confirmPassword}: FormDataProps) {
        console.log({name, email, password, confirmPassword})
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
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome completo"
                                keyboardType="default"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                                
                            />
                        )}
                    />
                   

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
                   

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirmar a senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSingUp)}
                                returnKeyType="send"
                                errorMessage={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSingUp)}
                    />

                    <Button
                        title="Voltar para o login"
                        variant="outline"
                        mt={24}
                        onPress={handleGoBack}
                    />

                </Center>

            </VStack>
        </ScrollView>
    )
}