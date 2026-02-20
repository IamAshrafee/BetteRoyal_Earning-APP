import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegistrationScreen } from '../features/auth/screens/RegistrationScreen';
import { BottomTabNavigator } from '../features/navigation/BottomTabNavigator';
import { MatchListScreen } from '../features/matches/screens/MatchListScreen';
import { MatchDetailScreen } from '../features/matches/screens/MatchDetailScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="MatchList" component={MatchListScreen} />
            <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
        </Stack.Navigator>
    );
};
