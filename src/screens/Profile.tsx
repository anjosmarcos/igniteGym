import { Button } from "@components/Buton";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'



const PHOTO_SIZE = 33

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/anjosmarcos.png')

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

                    <Input
                        placeholder="Nome"
                        bg="gray.600"
                    />
                    <Input
                        value="E-mail"
                        bg="gray.600"
                        isDisabled
                    />
                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
                        Alerar senha
                    </Heading>

                    <Input
                        placeholder="Senha atual"
                        bg="gray.600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova senha"
                        bg="gray.600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Comfirme senha"
                        bg="gray.600"
                        secureTextEntry
                    />

                    <Button
                        title="Atualizar"
                        mt={4}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}