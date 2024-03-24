import { Button } from "@components/Buton";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from "react-hook-form";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@hooks/useAuth";


const PHOTO_SIZE = 33

type FormDataProps = {
    name: string,
    email: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword?: string
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o email').email('Email inválido'),
    currentPassword: yup.string().required('Informe a senha atual'),
    newPassword: yup.string().required('Informe a nova senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: yup.string().oneOf([, yup.ref('newPassword')], 'As senhas devem ser iguais')
})



export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const { user } = useAuth()
    const [userPhoto, setUserPhoto] = useState('https://github.com/anjosmarcos.png')

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email

        },
        resolver: yupResolver(profileSchema)
    })

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);
        try {
            const photoSelect = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            })

            if (photoSelect.canceled) return

            if (photoSelect.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelect.assets[0].uri)
                // console.log(photoInfo)

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }

                setUserPhoto(photoSelect.assets[0].uri)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    function handleSubmitSuccess({ name, email, currentPassword, newPassword, confirmPassword }: FormDataProps) {
        console.log({ name, email, currentPassword, newPassword, confirmPassword })
    }

    return (
        <VStack flex={1}>
            <ScreenHeader
                title="Perfil"
            />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 36 }}
            >
                <Center
                    mt={6}
                    px={10}
                >
                    {
                        photoIsLoading ?
                            <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                            /> :
                            <UserPhoto
                                source={{ uri: userPhoto }}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity
                        onPress={handleUserPhotoSelect}
                    >
                        <Text
                            color="green.500"
                            fontWeight="bold"
                            fontSize="md"
                            mt={2}
                            mb={8}
                        >
                            Aleterar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                bg="gray.600"
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
                                bg="gray.600"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                                isDisabled
                            />
                        )}
                    />



                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" fontFamily='heading' mb={2} alignSelf="flex-start" mt={12}>
                        Alerar senha
                    </Heading>

                    <Input
                        value="Senha Antiga"
                        bg="gray.600"
                        isDisabled
                    />

                    <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nova senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.newPassword?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Comfirme senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.confirmPassword?.message}
                            />
                        )}
                    />


                    <Button
                        title="Atualizar"
                        mt={4}
                        onPress={handleSubmit(handleSubmitSuccess)}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}