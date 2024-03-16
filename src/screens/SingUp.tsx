import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from "@components/Buton";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export function SingUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigation =useNavigation()

    function handleGoBack(){
        navigation.goBack()
    }

    function handleSingUp(){
        console.log([name, email, password, confirmPassword])
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

                    <Input
                        placeholder="Nome completo"
                        keyboardType="default"
                        onChangeText={setName}
                    />
                     <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <Input
                        placeholder="Confirmar a senha"
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSingUp}
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