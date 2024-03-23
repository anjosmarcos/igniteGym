import { ExerciciesCard } from "@components/ExerciciesCard";
import { Group } from "@components/Group";
import { HomeHeder } from "@components/HomeHeader";
import { exerciciesDTO } from "@dtos/ExercisesDTO";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { Center, FlatList, HStack, Heading, Text, TextArea, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
    const [groups, setGroups] = useState<string[]>([])
    const [grupSelected, setGroupSelected] = useState('costa')
    const [exercicies, setExercicies] = useState<exerciciesDTO[]>([])

    const toast = useToast()

    const navigation = useNavigation<AppNavigationProps>()

    function handleOpenExercisesDetails(){
        navigation.navigate('exercises')
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups')
            setGroups(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError? error.message : 'Não foi possivel carregar os grupos musculares.'
    
            toast.show({
                title,
                placement: 'top',
                bgColor:'red.500'
            })
            
        }
    }

    async function fetchExercisesGroups(){
        try {
            const response = await api.get(`/exercises/bygroup/${grupSelected}`)
            setExercicies(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError? error.message : 'Não foi possivel carregar os exercicios.'
    
            toast.show({
                title,
                placement: 'top',
                bgColor:'red.500'
            })
        }
    }

    useFocusEffect(useCallback(() => {
        fetchExercisesGroups()
    }, [grupSelected]))

    useEffect(() => {
        fetchGroups()
    }, [])

    return (
        <VStack flex={1}>
            <HomeHeder />

            <HStack>
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Group
                            name={item}
                            isActive={grupSelected.toUpperCase() === item.toUpperCase()}
                            onPress={() => setGroupSelected(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    _contentContainerStyle={{ px: 8 }}
                    my={10}
                    maxH={10}
                    minH={10}
                />

            </HStack>

            <VStack
                flex={1}
                px={8}
            >
                <HStack
                    justifyContent="space-between"
                    marginBottom={5}
                >
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        fontFamily='heading'
                    >
                        Exercicios
                    </Heading>
                    <Text
                        color="gray.200"
                        fontSize="md"
                    >
                        4
                    </Text>
                </HStack>
                
                <FlatList 
                    data={exercicies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ExerciciesCard
                            data={item}
                            onPress={() => handleOpenExercisesDetails()}
                        />
                    )}
                />
            </VStack>
        </VStack>
    )
}