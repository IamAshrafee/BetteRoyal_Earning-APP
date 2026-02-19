import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { HomeHeader } from '../components/HomeHeader';
import { HeroCarousel } from '../components/HeroCarousel';
import { CategoryFilter } from '../components/CategoryFilter';
import { GameModeGrid } from '../components/GameModeGrid';
import { UpcomingMatches } from '../components/UpcomingMatches';

export const HomeScreen = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        content: {
            paddingBottom: 100, // Space for bottom nav
        },
    });

    return (
        <View style={styles.container}>
            <HomeHeader />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <HeroCarousel />
                <CategoryFilter />
                <GameModeGrid />
                <UpcomingMatches />
            </ScrollView>
        </View>
    );
};
