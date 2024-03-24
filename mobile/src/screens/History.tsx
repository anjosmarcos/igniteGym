import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { Center, Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export function History(){
    const [isLoading, setIsLoading] = useState(true)
    const [exercicies, setExercicies] = useState([
        {
        title: "12.03.2024",
        data: ["Remanda Unilateral", "Remada Baixa", "Pull Down"]
    },
    {
        title: "13.03.2024",
        data: ["Abdominal", "Agaxamento", "Rosca Direta"]
    }
])
    
    const toast = useToast()

    async function fetchHistory() {
        try {
            setIsLoading(true)
            const response = await api.get('/history')
            console.log(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel carregar o histórico.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory()
    }, []))

    return(
        <VStack flex={1}>
            <ScreenHeader
                title="Histórico de Exercícios"
            />
            
            <SectionList
                sections={exercicies}
                keyExtractor={ item => item}
                renderItem={({item}) => (
                    <HistoryCard
                        name={item}
                    />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        fontFamily='heading'
                        mt={10}
                        mb={3}
                    >
                        {section.title}
                    </Heading>
                )} 
                px={8}
                contentContainerStyle={exercicies.length === 0 && {flex: 1, justifyContent: 'center'} }
                ListEmptyComponent={() => (
                    <Text
                        color="gray.100"
                        textAlign="center"
                    >
                        Não tem exercícios registrados.{'\n'}
                        Vamos fazer execícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />

        </VStack>
    )
}