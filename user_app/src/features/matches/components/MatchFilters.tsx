import * as React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';

interface MatchFiltersProps {
    selectedFilter: string;
    onFilterSelect: (filter: string) => void;
}

const FILTERS = ['All', 'Solo', 'Duo', 'Squad', 'Free'];

export const MatchFilters = ({ selectedFilter, onFilterSelect }: MatchFiltersProps) => {
    const { colors, spacing, radius, shadows } = useTheme();

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.sm,
        },
        pill: {
            paddingHorizontal: spacing.lg,
            paddingVertical: 8,
            borderRadius: radius.full,
            marginRight: spacing.sm,
            borderWidth: 1,
        },
        activePill: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            ...shadows.soft,
        },
        inactivePill: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
        },
    });

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {FILTERS.map((filter) => {
                    const isActive = selectedFilter === filter;
                    return (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.pill,
                                isActive ? styles.activePill : styles.inactivePill
                            ]}
                            onPress={() => onFilterSelect(filter)}
                        >
                            <AppText
                                variant="sm"
                                fontWeight={isActive ? 'bold' : 'medium'}
                                color={isActive ? '#FFFFFF' : colors.textMuted}
                            >
                                {filter}
                            </AppText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
