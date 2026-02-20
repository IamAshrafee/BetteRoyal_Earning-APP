import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../../components/shared/AppText';
import { AppBackButton } from '../../../components/shared/AppBackButton';
import { useTheme } from '../../../theme/ThemeContext';
import { MyMatchLiveActionTab } from '../components/MyMatchLiveActionTab';
import { MyMatchInfoTab } from '../components/MyMatchInfoTab';
import Animated, { FadeInLeft, FadeInRight, LinearTransition } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute, RouteProp } from '@react-navigation/native';

type Tab = 'Live Action' | 'Match Info';
type MatchStatus = 'PENDING' | 'CALCULATING' | 'COMPLETED';

type MyMatchDetailParams = {
    MyMatchDetail: {
        status?: MatchStatus;
        matchTitle?: string;
    };
};

export const MyMatchDetailScreen = () => {
    const { colors, spacing, shadows } = useTheme();
    const route = useRoute<RouteProp<MyMatchDetailParams, 'MyMatchDetail'>>();

    const [activeTab, setActiveTab] = useState<Tab>('Live Action');
    const status: MatchStatus = route.params?.status ?? 'PENDING';
    const matchTitle = route.params?.matchTitle ?? 'Classic Solo #105';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <AppBackButton />
                <AppText variant="lg" fontWeight="bold" color={colors.text}>
                    {matchTitle}
                </AppText>
                {status === 'COMPLETED' ? (
                    <TouchableOpacity style={styles.shareBtn}>
                        <MaterialIcons name="share" size={22} color={colors.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>

            <View style={[styles.tabSwitcherContainer, { paddingHorizontal: spacing.md }]}>
                <View style={[styles.tabSwitcher, { backgroundColor: colors.border + '60' }]}>
                    <TouchableOpacity
                        style={[
                            styles.tabPill,
                            activeTab === 'Live Action' && [styles.tabPillActive, { backgroundColor: colors.surface, ...shadows.soft }],
                        ]}
                        onPress={() => setActiveTab('Live Action')}
                        activeOpacity={0.7}
                    >
                        <AppText
                            variant="sm"
                            fontWeight="bold"
                            color={activeTab === 'Live Action' ? colors.primary : colors.textMuted}
                        >
                            Live Action
                        </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabPill,
                            activeTab === 'Match Info' && [styles.tabPillActive, { backgroundColor: colors.primary }],
                        ]}
                        onPress={() => setActiveTab('Match Info')}
                        activeOpacity={0.7}
                    >
                        <AppText
                            variant="sm"
                            fontWeight="bold"
                            color={activeTab === 'Match Info' ? '#FFFFFF' : colors.textMuted}
                        >
                            Match Info
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View layout={LinearTransition.duration(200)} style={{ flex: 1 }}>
                    {activeTab === 'Live Action' && (
                        <Animated.View entering={FadeInLeft.duration(200)}>
                            <MyMatchLiveActionTab status={status} />
                        </Animated.View>
                    )}
                    {activeTab === 'Match Info' && (
                        <Animated.View entering={FadeInRight.duration(200)}>
                            <MyMatchInfoTab />
                        </Animated.View>
                    )}
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    shareBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabSwitcherContainer: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    tabSwitcher: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 4,
    },
    tabPill: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    tabPillActive: {
        // Will be styled inline with backgroundColor + shadow
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
});
