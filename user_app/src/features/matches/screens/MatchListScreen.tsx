import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText, AppBackButton } from '../../../components/shared';
import { UserBalanceHeader } from '../../../components/specific/UserBalanceHeader';
import { MatchFilters } from '../components/MatchFilters';
import { MatchCard, MatchCardProps } from '../components/MatchCard';

// Dummy Data
const MATCHES: MatchCardProps[] = [
    {
        title: "Daily Scrim #40",
        type: "Solo",
        date: "2 Oct 2026 at 3:03 PM",
        status: "Open",
        entryFee: "৳ 20",
        perKill: "৳ 10",
        winPrize: "৳ 300",
        map: "Bermuda",
        slotsFilled: 40,
        totalSlots: 48,
    },
    {
        title: "Evening Clash #12",
        type: "Squad",
        date: "2 Oct 2026 at 5:00 PM",
        status: "Full",
        entryFee: "৳ 50",
        perKill: "৳ 25",
        winPrize: "৳ 800",
        map: "Purgatory",
        slotsFilled: 48,
        totalSlots: 48,
    },
    {
        title: "Weekend Pro League",
        type: "Duo",
        date: "3 Oct 2026 at 10:00 AM",
        status: "Open",
        entryFee: "Free",
        perKill: "৳ 40",
        winPrize: "৳ 1500",
        map: "Kalahari",
        slotsFilled: 12,
        totalSlots: 48,
    }
];

export const MatchListScreen = () => {
    const { colors, spacing } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { title = "Classic Mode" } = (route.params as any) || {};

    const [filter, setFilter] = React.useState('All');

    // Filter Logic
    const filteredMatches = React.useMemo(() => {
        if (filter === 'All') return MATCHES;
        if (filter === 'Free') return MATCHES.filter(m => m.entryFee === 'Free' || m.entryFee === '0');
        return MATCHES.filter(m => m.type === filter);
    }, [filter]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        headerContainer: {
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.sm,
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
        },
        titleBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: spacing.md,
        },
        modeBadge: {
            backgroundColor: '#FEF2F2', // Red-50
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: '#FEE2E2', // Red-100
        },
        listContent: {
            padding: spacing.lg,
            paddingBottom: 100, // Space for bottom nav or FAB
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                {/* Top Row: Back + Balance */}
                <View style={styles.topBar}>
                    <AppBackButton />

                    <UserBalanceHeader
                        balance="1,986"
                        currencySymbol="৳"
                        label="Balance"
                        profileImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDg4UDBnRIO-qaFvV14sUmeIn1eJAlV7DWyy2MJr-JJte0IiuvmRtpCFAGnFGmwmhMgT-u5D6cYiqYMukiigTmsJ3BXhgLdk0ScoBvycCp7tObxfUHjjKbbTeaIPUpI9uvIJyIKuiEp-1WNQB0N_-puX2KjfVhXl46kPwinhp4aPf7mIMGJLm7o2apR_hqx3HubxQjxNH3DknHYnpwbLwAolSh362vCKf7ljHVvlBug7Ed7K7X9Zl1pH3qSf4zQ4l2627kbAa1H4g"
                    />
                </View>

                {/* Title Row */}
                <View style={styles.titleBar}>
                    <AppText variant="xxl" fontWeight="bold">Match Lobby</AppText>
                    <View style={styles.modeBadge}>
                        <AppText variant="xs" fontWeight="bold" color={colors.primary} style={{ textTransform: 'uppercase' }}>
                            {title}
                        </AppText>
                    </View>
                </View>

                {/* Filters */}
                <View style={{ marginHorizontal: -spacing.lg }}>
                    <MatchFilters selectedFilter={filter} onFilterSelect={setFilter} />
                </View>
            </View>

            <FlatList
                data={filteredMatches}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <MatchCard {...item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};
