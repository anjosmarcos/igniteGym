import { DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRouthes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { useContext } from "react";


export function Routes(){
    const { colors } = useTheme()
    const { user } = useAuth()
    
    console.log('User Logado =>>', user)


    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    return(
       <Box flex={1} bg='gray.700' >
         <NavigationContainer>
            <AuthRouthes />
        </NavigationContainer>
       </Box>
    )
}