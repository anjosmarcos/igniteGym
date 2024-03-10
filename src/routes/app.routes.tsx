import {  createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Exercises } from '@screens/Exercises';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';


type AppRoutes ={
    home: undefined;
    profile: undefined;
    history: undefined;
    exercises: undefined;
}

export type AppNavigationProps = BottomTabNavigationProp<AppRoutes>;
const{Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name='home'
                component={Home}
            />
            <Screen
                name='history'
                component={History}
            />
            <Screen
                name='profile'
                component={Profile}
            />
            <Screen
                name='exercises'
                component={Exercises}
            />
           
        </Navigator>
    )
}