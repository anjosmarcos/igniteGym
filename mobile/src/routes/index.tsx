import { DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRouthes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { useContext } from "react";
import { Loading } from "@components/Loading";


export function Routes(){
    const { colors } = useTheme()
    const { user, isLoadingStorageData } = useAuth()
    
    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if(isLoadingStorageData) {
      return (
         <Loading />
      )
    }

    return(
       <Box flex={1} bg='gray.700' >
         <NavigationContainer>
           { user.id ? <AppRoutes /> : <AuthRouthes />}
        </NavigationContainer>
       </Box>
    )
}