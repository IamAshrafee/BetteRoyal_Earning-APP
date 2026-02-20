import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';

export interface MatchCardProps {
    title: string;
    type: 'Solo' | 'Duo' | 'Squad';
    date: string; // "2 Oct 2026 at 3:03 PM"
    status: 'Open' | 'Full';
    entryFee: string; // "৳ 20"
    perKill: string; // "৳ 10"
    winPrize: string; // "৳ 300"
    map: string; // "Bermuda"
    slotsFilled: number;
    totalSlots: number;
    onJoinPress?: () => void;
    onPress?: () => void;
}

export const MatchCard = ({
    title,
    type,
    date,
    status,
    entryFee,
    perKill,
    winPrize,
    map,
    slotsFilled,
    totalSlots,
    onJoinPress,
    onPress
}: MatchCardProps) => {
    const { colors, spacing, radius, shadows } = useTheme();

    const progressPercent = Math.min((slotsFilled / totalSlots) * 100, 100);
    const isFull = status === 'Full';

    const renderStat = (iconName: string, iconColor: string, label: string, value: string, IconLib: any = MaterialIcons) => (
        <View style={styles.statItem}>
            <View style={[styles.iconBox, { backgroundColor: iconColor + '15' }]}>
                <IconLib name={iconName} size={18} color={iconColor} />
            </View>
            <View>
                <AppText variant="xs" color={colors.textMuted} style={styles.statLabel}>{label}</AppText>
                <AppText variant="sm" fontWeight="bold">{value}</AppText>
            </View>
        </View>
    );

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            ...shadows.soft,
            overflow: 'hidden',
            marginBottom: spacing.md,
        },
        header: {
            padding: spacing.md,
            paddingBottom: 0,
        },
        topRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4,
        },
        titleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
        },
        typeBadge: {
            backgroundColor: colors.background,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.border,
        },
        statusBadge: {
            backgroundColor: isFull ? colors.surface : '#DCFCE7', // Green-100
            borderColor: isFull ? colors.border : '#BBF7D0', // Green-200
            borderWidth: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
        },
        statusText: {
            color: isFull ? colors.textMuted : '#16A34A', // Green-600
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: spacing.md,
            marginHorizontal: spacing.md,
        },
        statsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: spacing.md,
        },
        statItem: {
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            marginBottom: spacing.md,
        },
        iconBox: {
            width: 36,
            height: 36,
            borderRadius: radius.full,
            alignItems: 'center',
            justifyContent: 'center',
        },
        statLabel: {
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontSize: 10,
            marginBottom: 2,
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.md,
            padding: spacing.md,
            paddingTop: 0,
        },
        progressContainer: {
            flex: 1,
        },
        progressBarBg: {
            height: 8,
            backgroundColor: colors.background,
            borderRadius: 4,
            marginTop: 4,
            overflow: 'hidden',
        },
        progressBarFill: {
            height: '100%',
            backgroundColor: colors.primary,
            borderRadius: 4,
        },
        joinButton: {
            backgroundColor: isFull ? colors.background : colors.primary,
            paddingHorizontal: spacing.lg,
            paddingVertical: 10,
            borderRadius: radius.lg,
            opacity: isFull ? 0.5 : 1,
        },
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.header}>
                <View style={styles.topRow}>
                    <View>
                        <View style={styles.titleRow}>
                            <AppText variant="lg" fontWeight="bold">{title}</AppText>
                            <View style={styles.typeBadge}>
                                <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ fontSize: 10 }}>{type}</AppText>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                            <MaterialIcons name="calendar-today" size={12} color={colors.textMuted} />
                            <AppText variant="xs" color={colors.textMuted} fontWeight="medium">{date}</AppText>
                        </View>
                    </View>
                    <View style={styles.statusBadge}>
                        <AppText variant="xs" fontWeight="bold" style={styles.statusText}>{status.toUpperCase()}</AppText>
                    </View>
                </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.statsGrid}>
                {renderStat('confirmation-number', '#3B82F6', 'Entry Fee', entryFee)}
                {renderStat('my-location', '#EF4444', 'Per Kill', perKill)}
                {renderStat('emoji-events', '#EAB308', 'Win Prize', winPrize)}
                {renderStat('map', '#A855F7', 'Map', map)}
            </View>

            <View style={styles.footer}>
                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <AppText variant="xs" fontWeight="medium" color={colors.textMuted}>Slots Filled</AppText>
                        <AppText variant="xs" fontWeight="bold" color={colors.primary}>
                            {slotsFilled}<AppText variant="xs" color={colors.textMuted}>/{totalSlots}</AppText>
                        </AppText>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={onJoinPress}
                    disabled={isFull}
                >
                    <AppText
                        variant="sm"
                        fontWeight="bold"
                        color={isFull ? colors.textMuted : '#FFFFFF'}
                    >
                        {isFull ? 'FULL' : 'Join'}
                    </AppText>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
