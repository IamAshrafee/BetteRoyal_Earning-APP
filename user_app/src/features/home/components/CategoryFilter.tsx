import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';

const CATEGORIES = [
    { id: 'all', label: 'ALL GAMES', icon: null },
    { id: 'ff', label: 'Free Fire', icon: 'fire' },
    { id: 'pubg', label: 'PUBG', icon: 'gamepad' },
    { id: 'cod', label: 'COD Mobile', icon: 'crosshairs' },
];

export const CategoryFilter = () => {
    const { colors, spacing, radius } = useTheme();
    const [activeId, setActiveId] = useState('all');

    return (
        <View style={{ marginTop: spacing.lg }}>
            <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AppText variant="lg" fontWeight="bold">Top Tournaments</AppText>
                    <TouchableOpacity>
                        <AppText variant="xs" color={colors.textMuted}>See All</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}
            >
                {CATEGORIES.map((cat) => {
                    const isActive = activeId === cat.id;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => setActiveId(cat.id)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: isActive ? colors.primary : colors.surface,
                                paddingHorizontal: spacing.md,
                                paddingVertical: spacing.sm,
                                borderRadius: 999,
                                borderWidth: 1,
                                borderColor: isActive ? colors.primary : colors.border,
                                gap: spacing.xs,
                            }}
                        >
                            {cat.icon && (
                                <Icon
                                    name={cat.icon}
                                    size={12}
                                    color={isActive ? '#FFFFFF' : (cat.id === 'ff' ? '#FF9500' : '#A855F7')}
                                    solid
                                />
                            )}
                            <AppText
                                variant="xs"
                                fontWeight="bold"
                                color={isActive ? '#FFFFFF' : colors.textMuted}
                            >
                                {cat.label}
                            </AppText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
