import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { HomeScreen } from '../home/screens/HomeScreen';
import { MatchListScreen } from '../matches/screens/MatchListScreen';
import { AppBottomNavigation, TabType } from '../../components/shared/AppBottomNavigation';

const Tab = createBottomTabNavigator();

// Placeholder screens for implementation
const WalletScreen = () => <View style={{ flex: 1, backgroundColor: '#e0e0e0' }} />;
const ProfileScreen = () => <View style={{ flex: 1, backgroundColor: '#d0d0d0' }} />;

export const BottomTabNavigator = () => {

    const renderCustomTabBar = (props: BottomTabBarProps) => {
        const { state, navigation } = props;
        const routeName = state.routeNames[state.index];

        let activeTab: TabType = 'home';
        if (routeName === 'Matches') activeTab = 'matches';
        if (routeName === 'Wallet') activeTab = 'wallet';
        if (routeName === 'Profile') activeTab = 'profile';

        return (
            <AppBottomNavigation
                activeTab={activeTab}
                onTabPress={(tabId) => {
                    let targetRoute = 'Home';
                    if (tabId === 'matches') targetRoute = 'Matches';
                    if (tabId === 'wallet') targetRoute = 'Wallet';
                    if (tabId === 'profile') targetRoute = 'Profile';

                    navigation.navigate(targetRoute);
                }}
            // Optionally pass profile image URI here
            // profileImageUri="https://example.com/me.jpg"
            />
        );
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={renderCustomTabBar}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Matches" component={MatchListScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
