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
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import defaultUserPhoto from '@assets/userPhotoDefault.png'



const PHOTO_SIZE = 33

type FormDataProps = {
    name: string,
    email: string,
    password: string,
    old_password: string,
    confirm_password: string
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .nullable()
        .transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => (!!value ? value : null))
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) =>
                schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value ? value : null),
        }),
})



export function Profile() {
    const [isUpDate, setIsUpDate] = useState(false)
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const { user, updateUserProfile } = useAuth()

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

                const fileExtension = photoSelect.assets[0].uri.split('.').pop()

                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
                    uri: photoSelect.assets[0].uri,
                    type: `${photoSelect.assets[0].type}/${fileExtension}`
                } as any;

                const userPhotoUploadForm = new FormData()
                userPhotoUploadForm.append('avatar', photoFile)

                const avatarUpdateResponse =  await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                })

                const userUpDatated = user
                userUpDatated.avatar = avatarUpdateResponse.data.avatar
                await updateUserProfile(userUpDatated)

                toast.show({
                    title: 'Foto atualizada com sucesso.',
                    placement: 'top',
                    bgColor: 'green.500'
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpDate(true);

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data);
            
            // await updateUserProfile({ ...user, name: data.name })
            await updateUserProfile(userUpdated);

            toast.show({
                title: 'Perfil atualizado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            });

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsUpDate(false);
        }
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
                                source={ user.avatar 
                                    ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
                                    : defaultUserPhoto}
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
                                isDisabled
                            />
                        )}
                    />



                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" fontFamily='heading' mb={2} alignSelf="flex-start" mt={12}>
                        Alerar senha
                    </Heading>
                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                bg="gray.600"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nova senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                                defaultValue=''
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Comfirme senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.confirm_password?.message}
                                defaultValue=''
                            />
                        )}
                    />


                    <Button
                        title="Atualizar"
                        mt={4}
                        onPress={handleSubmit(handleProfileUpdate)}
                        isLoading={isUpDate}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}