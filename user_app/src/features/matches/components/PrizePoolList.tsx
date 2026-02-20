import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';

export interface PrizeRank {
    rank: number | string; // e.g., 1, 2, "4+"
    label: string; // "Rank #1", "Rank #4 - #10"
    amount: string; // "৳500"
}

interface PrizePoolListProps {
    prizes: PrizeRank[];
}

export const PrizePoolList: React.FC<PrizePoolListProps> = ({ prizes }) => {
    const { colors, spacing, radius, shadows } = useTheme();

    const renderPrizeItem = (item: PrizeRank, index: number) => {
        const isFirst = index === 0;
        const isLast = index === prizes.length - 1;

        const Content = () => (
            <View style={[
                styles.rowContent,
                { padding: spacing.md },
                !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }
            ]}>
                <View style={styles.leftContent}>
                    {isFirst ? (
                        <View style={[styles.rankBadge, { backgroundColor: '#EAB30820' }]}>
                            <MaterialIcons name="emoji-events" size={14} color="#EAB308" />
                        </View>
                    ) : (
                        <View style={[styles.rankBadge, { backgroundColor: colors.background }]}>
                            <AppText variant="xs" fontWeight="bold" color={colors.textMuted}>#{item.rank}</AppText>
                        </View>
                    )}
                    <AppText variant="sm" fontWeight={isFirst ? "bold" : "medium"}>
                        {item.label}
                    </AppText>
                </View>
                <AppText variant="md" fontWeight="bold">{item.amount}</AppText>
            </View>
        );

        return (
            <View key={index}>
                {isFirst ? (
                    <LinearGradient
                        colors={['#EAB30815', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Content />
                    </LinearGradient>
                ) : (
                    <Content />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText variant="lg" fontWeight="bold">Prize Pool</AppText>
                <View style={[styles.guaranteedBadge, { backgroundColor: colors.primary + '15' }]}>
                    <AppText variant="xs" fontWeight="medium" color={colors.primary}>Guaranteed</AppText>
                </View>
            </View>

            <View style={[
                styles.listContainer,
                {
                    backgroundColor: colors.surface,
                    borderRadius: radius.lg,
                    borderColor: colors.border,
                    ...shadows.soft
                }
            ]}>
                {prizes.map(renderPrizeItem)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    guaranteedBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    listContainer: {
        borderWidth: 1,
        overflow: 'hidden',
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rankBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
