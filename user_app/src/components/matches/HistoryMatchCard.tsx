import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export interface HistoryMatchProps {
    id: string;
    title: string;
    dateTime: string;
    status: 'COMPLETED' | 'CANCELLED' | 'CALCULATING';
    result: 'WIN' | 'LOSS';
    rank: string; // e.g. '#1' or '#45'
    kills: number;
    totalWon: string; // e.g. '৳350' or '৳0'
    onViewLeaderboard?: () => void;
    onPress?: () => void;
}

export const HistoryMatchCard: React.FC<HistoryMatchProps> = ({
    title,
    dateTime,
    status,
    result,
    rank,
    kills,
    totalWon,
    onViewLeaderboard,
    onPress
}) => {
    const { colors, spacing, shadows } = useTheme();

    const isWin = result === 'WIN';

    // Different color schemes for Win and Loss inner result boxes
    const resultBoxColors = isWin
        ? [colors.warning + '1A', colors.warning + '05'] // Subtle gold/yellow gradient
        : [colors.border + '40', colors.border + '20']; // Subtle gray gradient

    const rankTextColor = isWin ? colors.warning : colors.text;
    const killsTextColor = colors.text;
    const wonTextColor = isWin ? colors.success : colors.textMuted;
    const labelColor = isWin ? (colors.warning + 'CC') : colors.textMuted;
    const dividerColor = isWin ? (colors.warning + '30') : colors.border;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}
        >
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                    <AppText variant="md" fontWeight="bold" color={colors.text} numberOfLines={1}>
                        {title}
                    </AppText>
                    <AppText variant="xs" color={colors.textMuted} style={{ marginTop: 2 }}>
                        {dateTime}
                    </AppText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status === 'COMPLETED' ? colors.success + '20' : colors.error + '20' }]}>
                    <AppText variant="xs" fontWeight="bold" color={status === 'COMPLETED' ? colors.success : colors.error} style={{ fontSize: 10 }}>
                        {status}
                    </AppText>
                </View>
            </View>

            {/* Match Result Stats */}
            <LinearGradient
                colors={resultBoxColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.resultBox}
            >
                <View style={styles.statColumn}>
                    <AppText variant="xs" fontWeight="bold" color={labelColor} style={styles.statLabel}>Rank</AppText>
                    <AppText variant="xl" fontWeight="bold" color={rankTextColor}>{rank}</AppText>
                </View>

                <View style={[styles.divider, { backgroundColor: dividerColor }]} />

                <View style={styles.statColumn}>
                    <AppText variant="xs" fontWeight="bold" color={labelColor} style={styles.statLabel}>Kills</AppText>
                    <AppText variant="xl" fontWeight="bold" color={killsTextColor}>{kills.toString()}</AppText>
                </View>

                <View style={[styles.divider, { backgroundColor: dividerColor }]} />

                <View style={styles.statColumn}>
                    <AppText variant="xs" fontWeight="bold" color={labelColor} style={styles.statLabel}>Total Won</AppText>
                    <AppText variant="xl" fontWeight="bold" color={wonTextColor}>{totalWon}</AppText>
                </View>
            </LinearGradient>

            {/* Action Button */}
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={onViewLeaderboard}
                activeOpacity={0.7}
            >
                <AppText variant="xs" fontWeight="bold" color={colors.textMuted}>
                    View Full Leaderboard
                </AppText>
                <MaterialIcons name="chevron-right" size={16} color={colors.textMuted} style={{ marginTop: 1 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    resultBox: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statColumn: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    divider: {
        width: 1,
        height: 32,
    },
    actionBtn: {
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    }
});
