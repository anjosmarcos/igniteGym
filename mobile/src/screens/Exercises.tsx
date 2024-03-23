import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg"
import SeriesSVG from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Buton";
import { AppError } from "@utils/appError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { exerciciesDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercises() {
    const [isLoading, setIsLoading] = useState(true)
    const [exercise, setExercise] = useState<exerciciesDTO>({} as exerciciesDTO)
    const navigation = useNavigation<AppNavigationProps>()
    const route = useRoute()

    const toast = useToast()

    const { exerciseId } = route.params as RouteParamsProps

    function handleGoBack() {
        navigation.goBack()
    }

    async function fechExerciseDetails() {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel carregar os detalhes do exercicio.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fechExerciseDetails()
    }, [exerciseId])

    return (
        <VStack flex={1}>

            <VStack
                px={8}
                pt={12}
                bg="gray.600"
            >
                <TouchableOpacity
                    onPress={handleGoBack}
                >
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.600"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    mt={4}
                    mb={8}
                    alignItems="center"
                >
                    <Heading
                        color="gray.100"
                        fontSize="lg"
                        flexShrink={1}
                        fontFamily='heading'
                    >
                        {exercise.name}
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text
                            color="gray.200"
                            ml={1}
                            textTransform="capitalize"
                        >
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            {isLoading ? <Loading /> :
                <ScrollView>
                    <VStack p={8}>
                        <Image
                            w="full"
                            h={80}
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                            alt="Remanda unilateral"
                            mb={3}
                            resizeMode="cover"
                            rounded="lg"
                        />
                        <Box
                            bg="gray.600"
                            pb={4}
                            px={4}
                            rounded="md"
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                mb={6}
                                mt={6}
                            >

                                <HStack>
                                    <SeriesSVG />
                                    <Text color="gray.200" ml="2">
                                        3 séries
                                    </Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="gray.200" ml="2">
                                        12 repetições
                                    </Text>
                                </HStack>
                            </HStack>

                            <Button
                                title="Marcar como realizado"
                                onPress={() => { }}
                            />
                        </Box>
                    </VStack>
                </ScrollView>
            }

        </VStack>
    )
}