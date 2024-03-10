import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SingIn } from '@screens/SingIn'
import { SingUp } from '@screens/SingUp'

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

type AuthRoutes = {
    SingIn: undefined,
    SingUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>


export function AuthRouthes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name="SingIn"
                component={SingIn}
            />

            <Screen
                name="SingUp"
                component={SingUp}
            />
        </Navigator>
    )
}