import { DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRouthes } from "./auth.routes";
import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";


export function Routes(){
    const { colors } = useTheme()
    
    const contextData = useContext( AuthContext )
    console.log(contextData)


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