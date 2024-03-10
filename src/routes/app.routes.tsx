import {  createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

import { Exercises } from '@screens/Exercises';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Platform } from 'react-native';


type AppRoutes ={
    home: undefined;
    profile: undefined;
    history: undefined;
    exercises: undefined;
}

export type AppNavigationProps = BottomTabNavigationProp<AppRoutes>;
const{Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){
    const { sizes, colors } = useTheme();

    const iconSize = sizes[6]

    return(
        <Navigator screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6],
            },
            }} >
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name='history'
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name='exercises'
                component={Exercises}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
}