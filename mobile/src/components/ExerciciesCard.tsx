import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons'
import { exerciciesDTO } from "@dtos/ExercisesDTO";

type Props = TouchableOpacityProps & {
    data: exerciciesDTO;
}

export function ExerciciesCard({data, ...rest}: Props){
    return(
        <TouchableOpacity
            {...rest}
        >
            <HStack
                bg="gray.500"
                alignItems="center"
                p={2}
                pr={4}
                rounded="md"
                mb={3}
            >
                <Image
                    source={{uri: 'https://blog.sardinhaevolution.com.br/wp-content/uploads/2020/04/remada-unilateral.2.jpg'}}
                    alt="Remanda unilateral"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"

                />
                <VStack flex={1}>
                    <Heading
                        fontSize="sm"
                        color="white"
                    >
                        {data.name}
                    </Heading>
                    <Text
                    fontSize="sm"
                    color="gray.200"
                    mt={1}
                    numberOfLines={2}
                    >
                        {data.series} séries de {data.repetitions} repetição
                    </Text>
                </VStack>



                <Icon
                    as={Entypo} 
                    name="chevron-thin-right"
                    color="gray.300"
                />

            </HStack>
        </TouchableOpacity>
    )
}