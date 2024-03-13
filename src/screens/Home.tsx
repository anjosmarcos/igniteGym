import { ExerciciesCard } from "@components/ExerciciesCard";
import { Group } from "@components/Group";
import { HomeHeder } from "@components/HomeHeader";
import { Center, FlatList, HStack, Heading, Text, TextArea, VStack } from "native-base";
import { useState } from "react";

export function Home() {
    const [grupSelected, setGroupSelected] = useState('costa')
    const [groups, setGroups] = useState(['Costa', 'ombro', 'trícipes', 'Bíceps'])
    const [exercicies, setExercicies] = useState(['Remada Unilateral', 'Desenvolvimento', 'Tríceps Pulley', 'Rosca Direta' ])

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
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ExerciciesCard
                            name={item}
                            isActive={grupSelected.toUpperCase() === item.toUpperCase()}
                        />

                    )}
                />
            </VStack>
        </VStack>
    )
}