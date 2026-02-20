import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { MatchDetailHeader } from '../components/MatchDetailHeader';
import { MatchStatGrid } from '../components/MatchStatGrid';
import { PrizePoolList, PrizeRank } from '../components/PrizePoolList';
import { CollapsibleSection } from '../../../components/shared/CollapsibleSection';
import { JoinMatchSheet } from '../components/JoinMatchSheet';

// Dummy data fetching based on route params could happen here
const DUMMY_DETAILS = {
    title: "Bermuda Rush Hour",
    imageUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDtPZop4ne_cQ20bTHLxbdA-Ksg9QYtRKmhfBHI7ab4XwsBe33pdBkOdHF4YtCB4VtbIEUyOPc6wmRdXRYjoe1GD5oRWCN3OTDukQB4HVU1397aLHQfW5MBYT8UHIZSHyNjsKMYgSBOuALINna2cCZ_uQqZv1MQCY5VfRT0nDKbimiVi8j9LPPqh6BP90b4ywOq51x5AtruQwYlxrTfvHi8iswhb3Zkwbplkgdpg7CZUpRo4JTmqWc3T6qQfjyvzvK504wavYDvw",
    balance: "2,450",
    profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuARoc90YtwGfqJ0Wu1MvVhOG_kajx1wLx2YvJIo9pnn3n8aDVWea24_Am66fllEpor3jmnN4mg3U8UZNYsLsDvu9WMUXextQt3TV-iCti3SraeOU7nHSBEVJhWPOQ9qGifrfRAWgOgfn4h-oBobtshl-7u41CsS7C9Rdg7ncVAWFI517qRksE5fX6pNMJqCiBQCdkQz6NvsHCgbDSvTk6yeLp8pLfFJ32WXLZWsFOlESvttkJnAgWO8aDhGnNn_yiiQ0fI0meO8Fg",
    startTime: "Starts in 24m 32s",

    stats: [
        { icon: 'confirmation-number', iconColor: '#EF4444', bgColor: '#EF444415', label: 'Entry Fee', value: '৳20' }, // Red
        { icon: 'my-location', iconColor: '#3B82F6', bgColor: '#3B82F615', label: 'Per Kill', value: '৳10' }, // Blue
        { icon: 'emoji-events', iconColor: '#EAB308', bgColor: '#EAB30815', label: 'Total Prize', value: '৳1,200' }, // Yellow
        { icon: 'groups', iconColor: '#A855F7', bgColor: '#A855F715', label: 'Type', value: 'Squad' }, // Purple
    ],

    prizes: [
        { rank: 1, label: 'Rank #1', amount: '৳500' },
        { rank: 2, label: 'Rank #2', amount: '৳300' },
        { rank: 3, label: 'Rank #3', amount: '৳150' },
        { rank: '4+', label: 'Rank #4 - #10', amount: '৳50' },
    ] as PrizeRank[],

    slotsFilled: 48,
    totalSlots: 48,
};

export const MatchDetailScreen = () => {
    const { colors, spacing, shadows } = useTheme();
    const route = useRoute();
    const [isJoinSheetVisible, setIsJoinSheetVisible] = React.useState(false);

    // In a real app, use route.params.matchId to fetch data

    const { slotsFilled, totalSlots } = DUMMY_DETAILS;
    const progressPercent = Math.min((slotsFilled / totalSlots) * 100, 100);
    const isFull = slotsFilled >= totalSlots;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <MatchDetailHeader
                    title={DUMMY_DETAILS.title}
                    imageUri={DUMMY_DETAILS.imageUri}
                    startTime={DUMMY_DETAILS.startTime}
                    balance={DUMMY_DETAILS.balance}
                    profileImage={DUMMY_DETAILS.profileImage}
                />

                <View style={[styles.mainContent, { padding: spacing.lg, gap: spacing.xl }]}>
                    <MatchStatGrid stats={DUMMY_DETAILS.stats} />

                    <PrizePoolList prizes={DUMMY_DETAILS.prizes} />

                    <View style={{ marginBottom: spacing.lg }}>
                        <AppText variant="lg" fontWeight="bold" style={{ marginBottom: spacing.md }}>
                            Match Rules
                        </AppText>
                        <CollapsibleSection
                            title="General Rules"
                            iconName="gavel"
                            iconColor={colors.primary}
                            initiallyExpanded={true}
                        >
                            <View style={{ gap: spacing.sm }}>
                                <AppText variant="sm" color={colors.textMuted}>• Teaming with other squads is strictly prohibited.</AppText>
                                <AppText variant="sm" color={colors.textMuted}>• Emulators are not allowed. Mobile only.</AppText>
                                <AppText variant="sm" color={colors.textMuted}>• Room ID and Password will be shared 15 mins before start.</AppText>
                                <AppText variant="sm" color={colors.textMuted}>• Make sure to download the Bermuda map.</AppText>
                            </View>
                        </CollapsibleSection>

                        <CollapsibleSection
                            title="Anti-Cheat Policy"
                            iconName="security"
                            iconColor="#F97316" // Orange
                        >
                            <AppText variant="sm" color={colors.textMuted} style={{ lineHeight: 20 }}>
                                Any use of third-party apps, scripts, or hacks will result in an immediate ban and forfeiture of any winnings.
                            </AppText>
                        </CollapsibleSection>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Actions Footer */}
            <View style={[
                styles.footer,
                {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    ...shadows.soft,
                    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md // Basic safe area
                }
            ]}>
                <View style={styles.footerContent}>
                    <View style={styles.slotsContainer}>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ textTransform: 'uppercase' }}>
                            Total Slots
                        </AppText>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                            <AppText variant="xl" fontWeight="bold">{slotsFilled}</AppText>
                            <AppText variant="sm" fontWeight="medium" color={colors.textMuted}>/ {totalSlots}</AppText>
                        </View>
                        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${progressPercent}%` }]} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.joinButton, { backgroundColor: colors.primary }]}
                        activeOpacity={0.8}
                        onPress={() => setIsJoinSheetVisible(true)}
                    >
                        <AppText variant="md" fontWeight="bold" color="#FFFFFF">Join Now</AppText>
                        <MaterialIcons name="login" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Sheet Modal */}
            <JoinMatchSheet
                visible={isJoinSheetVisible}
                onClose={() => setIsJoinSheetVisible(false)}
                matchType="Squad" // Or get from DUMMY_DETAILS
                entryFee={20}
                walletBalance={50} // Change to 10 to test insufficient funds
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Space for the sticky footer
    },
    mainContent: {
        marginTop: -16, // pull up slightly
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    slotsContainer: {
        flex: 1,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
        marginTop: 4,
        width: 100,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    joinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    }
});
