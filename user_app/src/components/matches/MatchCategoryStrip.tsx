import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';

export type MatchCategory = 'All Games' | 'Classic' | 'Clash Squad' | 'Lone Wolf';

const CATEGORIES: MatchCategory[] = ['All Games', 'Classic', 'Clash Squad', 'Lone Wolf'];

interface MatchCategoryStripProps {
    selectedCategory: MatchCategory;
    onSelectCategory: (category: MatchCategory) => void;
}

export const MatchCategoryStrip: React.FC<MatchCategoryStripProps> = ({
    selectedCategory,
    onSelectCategory
}) => {
    const { colors, spacing } = useTheme();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
        >
            {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                    <TouchableOpacity
                        key={category}
                        onPress={() => onSelectCategory(category)}
                        activeOpacity={0.8}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: isSelected ? colors.text : colors.surface,
                                borderColor: isSelected ? 'transparent' : colors.border,
                            }
                        ]}
                    >
                        <AppText
                            variant="xs"
                            fontWeight={isSelected ? 'bold' : 'semiBold'}
                            color={isSelected ? colors.background : colors.textMuted}
                        >
                            {category}
                        </AppText>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 0,
        marginBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12, // spacing.md
        paddingBottom: 8,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 999, // full
        borderWidth: 1,
    }
});
