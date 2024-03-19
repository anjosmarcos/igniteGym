import { VStack, Heading, Text, HStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhoto from '@assets/userPhotoDefault.png'

export function HomeHeder() {
    const {user, signOut} = useAuth()

    return (
        <HStack
            bg="gray.600"
            pt={16}
            pb={5}
            px={8}
            alignItems="center"
        >
            <UserPhoto
                size={16}
                mr={4}
                source={ user.avatar ? {uri: "https://github.com/anjosmarcos.png"} : defaultUserPhoto}
                alt="Foto do usuário"
            />
            <VStack flex={1} >
            <Text 
                color="gray.100"
                fontSize="md"
            >
                Olá,
            </Text>
            <Heading
                color="gray.100"
                fontSize="md"
                fontFamily="heading"
            >
                {user.name}
            </Heading>
        </VStack>

         <TouchableOpacity
            onPress={signOut}
         >
            <Icon 
                as={MaterialIcons}
                name="logout"
                color="gray.200"
                size={7}
            />
        </TouchableOpacity>

        </HStack>
    )
}