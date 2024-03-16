import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History(){
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