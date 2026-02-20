import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/shared/AppText';
import { useTheme } from '../../../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn } from 'react-native-reanimated';

const DETAILS_GRID = [
    { label: 'Schedule', value: 'Today, 8:00 PM' },
    { label: 'Map', value: 'Bermuda' },
    { label: 'Type', value: 'Solo' },
    { label: 'Entry Fee', value: '50 Coins', icon: 'monetization-on', iconColor: '#EAB308' },
    { label: 'Win Prize', value: '$200 Pool', icon: 'emoji-events', iconColor: '#10B981' },
    { label: 'Per Kill', value: '10 Coins', icon: 'local-fire-department', iconColor: '#EF4444' },
];

const PRIZES = [
    { rank: 1, label: 'Winner', amount: '$100', bgColor: '#FEF3C7', textColor: '#D97706' },
    { rank: 2, label: 'Runner Up', amount: '$60', bgColor: '#F3F4F6', textColor: '#6B7280' },
    { rank: 3, label: '3rd Place', amount: '$40', bgColor: '#FFEDD5', textColor: '#EA580C' },
];

const RULES = [
    'Teaming with other players is strictly prohibited and will result in a ban.',
    'Emulators are not allowed. Mobile devices only.',
    'Room ID and Password will be shared 15 minutes before match start.',
    'Take screenshot of your result for prize claims.',
];

export const MyMatchInfoTab = () => {
    const { colors, spacing, shadows } = useTheme();
    const [rulesExpanded, setRulesExpanded] = useState(false);

    return (
        <Animated.View entering={FadeIn.duration(300)} style={[styles.container, { padding: spacing.md }]}>
            <View style={[styles.regCard, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                <View>
                    <AppText variant="xs" fontWeight="medium" color={colors.textMuted} style={styles.regLabel}>
                        MY REGISTRATION
                    </AppText>
                    <View style={styles.regNameRow}>
                        <MaterialIcons name="person" size={16} color={colors.primary} />
                        <AppText variant="lg" fontWeight="bold" color={colors.text}>Ninja69</AppText>
                    </View>
                </View>
                <View style={[styles.confirmedBadge, { backgroundColor: '#D1FAE515' }]}>
                    <MaterialIcons name="check-circle" size={12} color="#10B981" />
                    <AppText variant="xs" fontWeight="bold" color="#10B981">Confirmed</AppText>
                </View>
            </View>

            <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionTitleRow}>
                    <MaterialIcons name="info" size={16} color={colors.primary} />
                    <AppText variant="md" fontWeight="bold" color={colors.text}>Details</AppText>
                </View>

                <View style={styles.detailsGrid}>
                    {DETAILS_GRID.map((item, i) => (
                        <View key={i} style={[styles.detailCell, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <AppText variant="xs" color={colors.textMuted} style={{ marginBottom: 4 }}>{item.label}</AppText>
                            <View style={styles.detailValueRow}>
                                {item.icon && (
                                    <MaterialIcons name={item.icon} size={14} color={item.iconColor} />
                                )}
                                <AppText variant="sm" fontWeight="bold" color={colors.text}>{item.value}</AppText>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft, marginBottom: 20 }]}>
                <View style={styles.prizeHeader}>
                    <View style={styles.sectionTitleRow}>
                        <MaterialIcons name="military-tech" size={16} color="#EAB308" />
                        <AppText variant="md" fontWeight="bold" color={colors.text}>Prize Distribution</AppText>
                    </View>
                    <View style={[styles.topBadge, { backgroundColor: colors.background }]}>
                        <AppText variant="xs" color={colors.textMuted}>Top 3 Paid</AppText>
                    </View>
                </View>

                {PRIZES.map((prize, i) => (
                    <View key={prize.rank} style={[styles.prizeRow, i < PRIZES.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                        <View style={styles.prizeLeft}>
                            <View style={[styles.prizeRankCircle, { backgroundColor: prize.bgColor }]}>
                                <AppText variant="sm" fontWeight="bold" color={prize.textColor}>{prize.rank}</AppText>
                            </View>
                            <AppText variant="sm" fontWeight="medium" color={colors.textMuted}>{prize.label}</AppText>
                        </View>
                        <AppText variant="sm" fontWeight="bold" color={colors.text}>{prize.amount}</AppText>
                    </View>
                ))}
            </View>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft, marginBottom: 20, padding: 0, overflow: 'hidden' }]}>
                <TouchableOpacity
                    style={styles.rulesHeader}
                    onPress={() => setRulesExpanded(!rulesExpanded)}
                    activeOpacity={0.7}
                >
                    <View style={styles.sectionTitleRow}>
                        <MaterialIcons name="gavel" size={16} color="#3B82F6" />
                        <AppText variant="md" fontWeight="bold" color={colors.text}>Match Rules</AppText>
                    </View>
                    <MaterialIcons
                        name={rulesExpanded ? 'expand-less' : 'expand-more'}
                        size={24}
                        color={colors.textMuted}
                    />
                </TouchableOpacity>
                {rulesExpanded && (
                    <View style={[styles.rulesContent, { borderTopColor: colors.border }]}>
                        {RULES.map((rule, i) => (
                            <View key={i} style={styles.ruleItem}>
                                <AppText variant="xs" color={colors.primary} style={{ marginTop: 2 }}>•</AppText>
                                <AppText variant="sm" color={colors.textMuted} style={{ flex: 1, lineHeight: 20 }}>{rule}</AppText>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <TouchableOpacity style={[styles.shareButton, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
                <MaterialIcons name="share" size={20} color="#FFFFFF" />
                <AppText variant="md" fontWeight="bold" color="#FFFFFF">Share Match Details</AppText>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },

    // Registration
    regCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    regLabel: {
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    regNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    confirmedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    // Section title
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },

    // Details Grid
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    detailCell: {
        width: '48%',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
    },
    detailValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    // Prize
    prizeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    topBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    prizeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    prizeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    prizeRankCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Rules
    rulesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    rulesContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
        paddingTop: 12,
    },
    ruleItem: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },

    // Share Button
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 18,
        borderRadius: 20,
        marginTop: 4,
    },
});
