import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';

interface StatItemProps {
    icon: string;
    iconColor: string;
    bgColor: string;
    label: string;
    value: string;
}

export const MatchStatGrid: React.FC<{ stats: StatItemProps[] }> = ({ stats }) => {
    const { colors, spacing, radius, shadows } = useTheme();

    const renderItem = (item: StatItemProps, index: number) => (
        <View
            key={index}
            style={[
                styles.itemContainer,
                {
                    backgroundColor: colors.surface,
                    borderRadius: radius.lg,
                    borderColor: colors.border,
                    ...shadows.soft
                }
            ]}
        >
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
                <MaterialIcons name={item.icon} size={20} color={item.iconColor} />
            </View>
            <AppText variant="xs" fontWeight="medium" color={colors.textMuted} style={styles.label}>
                {item.label}
            </AppText>
            <AppText variant="lg" fontWeight="bold">
                {item.value}
            </AppText>
        </View>
    );

    return (
        <View style={[styles.container, { gap: spacing.md }]}>
            {stats.map(renderItem)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemContainer: {
        width: '47%', // Approx half minus gap
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    label: {
        marginBottom: 2,
    }
});
