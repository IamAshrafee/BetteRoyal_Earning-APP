import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Using FA5 for game icons
import { HomeScreen } from '../home/screens/HomeScreen';
import { useTheme } from '../../theme/ThemeContext';

const Tab = createBottomTabNavigator();

// Placeholder screens
const GamesScreen = () => <View />;
const BetsScreen = () => <View />;
const LeaguesScreen = () => <View />;

export const BottomTabNavigator = () => {
    const { colors, shadows } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    position: 'absolute',
                    bottom: 0,
                    height: 80,
                    borderTopWidth: 0,
                    ...shadows.card,
                    elevation: 10,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    paddingBottom: 4,
                    fontFamily: 'Plus Jakarta Sans',
                    fontWeight: '600'
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Games"
                component={GamesScreen}
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="gamepad" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Bets"
                component={BetsScreen}
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <View>
                            <Icon name="receipt" size={size} color={color} />
                            {/* Live dot indicator could go here */}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Leagues"
                component={LeaguesScreen}
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="trophy" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
