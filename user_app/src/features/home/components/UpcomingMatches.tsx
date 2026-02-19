import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { AppCard } from '../../../components/shared/AppCard';

export const UpcomingMatches = () => {
    const { colors, spacing, radius } = useTheme();

    return (
        <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
            <AppText variant="lg" fontWeight="bold" style={{ marginBottom: spacing.md }}>
                Upcoming Matches
            </AppText>

            <AppCard style={{ gap: spacing.md }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: spacing.sm,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error }} />
                        <AppText variant="xs" fontWeight="semiBold" color={colors.textMuted}>
                            Starts in 24:32
                        </AppText>
                    </View>
                    <AppText variant="xs" color={colors.textMuted}>Map: Bermuda</AppText>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Team A */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                        <View style={{
                            width: 40, height: 40,
                            borderRadius: radius.full,
                            backgroundColor: colors.background,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Icon name="dragon" size={18} color={colors.primary} />
                        </View>
                        <View>
                            <AppText variant="sm" fontWeight="bold">Dragon Slayers</AppText>
                            <AppText variant="xs" color={colors.textMuted}>Entry: 50 BTC</AppText>
                        </View>
                    </View>

                    <AppText variant="xl" fontWeight="regular" color={colors.textMuted}>vs</AppText>

                    {/* Team B */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                        <View>
                            <AppText variant="sm" fontWeight="bold" style={{ textAlign: 'right' }}>Team Ghost</AppText>
                            <AppText variant="xs" color={colors.textMuted}>Pool: 2000 BTC</AppText>
                        </View>
                        <View style={{
                            width: 40, height: 40,
                            borderRadius: radius.full,
                            backgroundColor: colors.background,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Icon name="ghost" size={18} color="#A855F7" />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{
                    backgroundColor: colors.background,
                    paddingVertical: spacing.md,
                    borderRadius: radius.md,
                    borderWidth: 1,
                    borderColor: colors.primary + '50', // Transparent primary
                    borderStyle: 'dashed',
                    alignItems: 'center',
                    marginTop: spacing.xs,
                }}>
                    <AppText variant="sm" fontWeight="bold" color={colors.primary}>
                        Register Team
                    </AppText>
                </TouchableOpacity>
            </AppCard>
        </View>
    );
};
