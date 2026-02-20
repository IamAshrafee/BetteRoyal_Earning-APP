import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../../components/shared/AppText';
import { MatchModeToggle, MatchMode } from '../../components/matches/MatchModeToggle';
import { MatchCategoryStrip, MatchCategory } from '../../components/matches/MatchCategoryStrip';
import { UpcomingMatchCard, UpcomingMatchProps } from '../../components/matches/UpcomingMatchCard';
import { HistoryMatchCard, HistoryMatchProps } from '../../components/matches/HistoryMatchCard';
import { AppToast } from '../../components/shared/AppToast';
import { UserBalanceHeader } from '../../components/specific/UserBalanceHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInRight, FadeOutLeft, LinearTransition, FadeInLeft, FadeOutRight } from 'react-native-reanimated';

// --- MOCK DATA ---
const MOCK_UPCOMING: UpcomingMatchProps[] = [
    {
        id: 'u1',
        title: 'Regular Scrim #405',
        teamMode: 'Solo',
        deviceType: 'Mobile',
        startsIn: '02h 15m',
        map: 'Bermuda',
        gameType: 'Classic',
        entryFee: '৳ 20',
        isRoomDetailsAvailable: false,
    },
    {
        id: 'u2',
        title: 'Elite Tournament #88',
        teamMode: 'Squad',
        deviceType: 'Mobile',
        startsIn: '00h 10m', // Simulation: Under 15m reveals details
        map: 'Purgatory',
        gameType: 'Ranked',
        entryFee: '৳ 100',
        isRoomDetailsAvailable: true,
        roomId: '1829304',
        roomPassword: '9900',
    }
];

const MOCK_HISTORY: HistoryMatchProps[] = [
    {
        id: 'h1',
        title: 'Bermuda Classic Weekly',
        dateTime: 'May 24, 2023 • 10:30 PM',
        status: 'COMPLETED',
        result: 'WIN',
        rank: '#1',
        kills: 5,
        totalWon: '৳350',
    },
    {
        id: 'h2',
        title: 'Purgatory Lone Wolf Draft',
        dateTime: 'May 21, 2023 • 2:00 PM',
        status: 'COMPLETED',
        result: 'LOSS',
        rank: '#45',
        kills: 0,
        totalWon: '৳0',
    },
    {
        id: 'h3',
        title: 'Kalahari Pro Scrim #77',
        dateTime: 'May 25, 2023 • 9:00 PM',
        status: 'CALCULATING',
        result: 'LOSS',
        rank: '-',
        kills: 0,
        totalWon: '৳0',
    }
];

export const MyMatchesScreen = () => {
    const { colors, spacing, shadows } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [mode, setMode] = useState<MatchMode>('upcoming');
    const [selectedCategory, setSelectedCategory] = useState<MatchCategory>('All Games');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleModeChange = (newMode: MatchMode) => setMode(newMode);
    const handleCategoryChange = (category: MatchCategory) => setSelectedCategory(category);

    const handleCopy = (text: string) => {
        // Here you would use actual Clipboard API
        // Clipboard.setString(text);
        setToastMessage(`Copied: ${text}`);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <AppText variant="xxl" fontWeight="bold" color={colors.text}>
                    My Matches
                </AppText>

                <UserBalanceHeader
                    balance="1,250"
                    currencySymbol="৳"
                    profileImage="https://i.pravatar.cc/150?img=11"
                    label="Wallet"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentPadding}>
                    <MatchModeToggle mode={mode} onModeChange={handleModeChange} />
                </View>

                <MatchCategoryStrip selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

                <Animated.View layout={LinearTransition.duration(200)} style={[styles.contentPadding, styles.listContainer]}>
                    {/* Upcoming List */}
                    {mode === 'upcoming' && (
                        <Animated.View
                            entering={FadeInLeft.duration(200)}
                            style={{ width: '100%' }}
                        >
                            {MOCK_UPCOMING.length > 0 ? (
                                MOCK_UPCOMING.map(match => (
                                    <UpcomingMatchCard key={match.id} {...match} onCopy={handleCopy} onPress={() => navigation.navigate('MyMatchDetail', { status: 'PENDING', matchTitle: match.title })} />
                                ))
                            ) : (
                                <View style={styles.emptyState}>
                                    <MaterialIcons name="sports-esports" size={48} color={colors.border} />
                                    <AppText variant="md" fontWeight="bold" color={colors.textMuted} style={{ marginTop: 12 }}>
                                        No active matches.
                                    </AppText>
                                    <AppText variant="sm" color={colors.textMuted} style={{ marginTop: 4 }}>
                                        Join one from Home!
                                    </AppText>
                                </View>
                            )}
                        </Animated.View>
                    )}

                    {/* History List */}
                    {mode === 'history' && (
                        <Animated.View
                            entering={FadeInRight.duration(200)}
                            style={{ width: '100%' }}
                        >
                            <View style={styles.historyHeader}>
                                <AppText variant="sm" fontWeight="bold" color={colors.textMuted} style={{ textTransform: 'uppercase' }}>
                                    Recent History
                                </AppText>
                                <AppText variant="xs" fontWeight="bold" color={colors.primary}>
                                    View All
                                </AppText>
                            </View>
                            {MOCK_HISTORY.length > 0 ? (
                                MOCK_HISTORY.map(match => (
                                    <HistoryMatchCard key={match.id} {...match} onPress={() => navigation.navigate('MyMatchDetail', { status: match.status === 'COMPLETED' ? 'COMPLETED' : 'CALCULATING', matchTitle: match.title })} />
                                ))
                            ) : (
                                <View style={styles.emptyState}>
                                    <MaterialIcons name="history" size={48} color={colors.border} />
                                    <AppText variant="md" fontWeight="bold" color={colors.textMuted} style={{ marginTop: 12 }}>
                                        You haven't played match yet.
                                    </AppText>
                                </View>
                            )}
                        </Animated.View>
                    )}
                </Animated.View>
            </ScrollView>

            <AppToast
                visible={toastVisible}
                message={toastMessage}
                type="success"
                onHide={() => setToastVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    scrollContent: {
        paddingBottom: 100, // accommodate bottom nav
    },
    contentPadding: {
        paddingHorizontal: 20,
    },
    listContainer: {
        marginTop: 10,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    }
});
