import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Exercises } from '@screens/Exercises';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

const{Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    return(
        <Navigator>
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