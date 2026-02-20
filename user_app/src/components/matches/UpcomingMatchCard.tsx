import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface UpcomingMatchProps {
    id: string;
    title: string;
    teamMode: 'Solo' | 'Duo' | 'Squad';
    deviceType: 'Mobile' | 'PC' | 'Emulator';
    startsIn: string; // e.g. '02h 15m'
    map: string;
    gameType: string;
    entryFee: string;
    isRoomDetailsAvailable: boolean;
    roomId?: string;
    roomPassword?: string;
    onCopy?: (text: string) => void;
    onPress?: () => void;
}

export const UpcomingMatchCard: React.FC<UpcomingMatchProps> = ({
    title,
    teamMode,
    deviceType,
    startsIn,
    map,
    gameType,
    entryFee,
    isRoomDetailsAvailable,
    roomId,
    roomPassword,
    onCopy,
    onPress
}) => {
    const { colors, shadows } = useTheme();

    const handleCopy = (text: string | undefined) => {
        if (text && onCopy) onCopy(text);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}
        >
            {/* Background Decoration */}
            <View style={[styles.decorationBlur, { backgroundColor: colors.primary + '1A' }]} />

            <View style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <View style={styles.badgeRow}>
                            <View style={[styles.badge, { backgroundColor: colors.warning + '30' }]}>
                                <AppText variant="xs" fontWeight="bold" color={colors.warning} style={styles.badgeText}>
                                    {teamMode}
                                </AppText>
                            </View>
                            <View style={[styles.badge, { backgroundColor: colors.info + '30' }]}>
                                <AppText variant="xs" fontWeight="bold" color={colors.info} style={styles.badgeText}>
                                    {deviceType}
                                </AppText>
                            </View>
                        </View>
                        <AppText variant="lg" fontWeight="bold" color={colors.text}>
                            {title}
                        </AppText>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <AppText variant="xs" fontWeight="semiBold" color={colors.textMuted} style={{ textTransform: 'uppercase', marginBottom: 2 }}>
                            Starts in
                        </AppText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <MaterialIcons name="timer" size={16} color={colors.primary} />
                            <AppText variant="sm" fontWeight="bold" color={colors.primary}>
                                {startsIn}
                            </AppText>
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statBox, { backgroundColor: colors.background }]}>
                        <AppText variant="xs" color={colors.textMuted} style={styles.statLabel}>Map</AppText>
                        <AppText variant="sm" fontWeight="bold" color={colors.text} numberOfLines={1}>{map}</AppText>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: colors.background }]}>
                        <AppText variant="xs" color={colors.textMuted} style={styles.statLabel}>Type</AppText>
                        <AppText variant="sm" fontWeight="bold" color={colors.text} numberOfLines={1}>{gameType}</AppText>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: colors.background }]}>
                        <AppText variant="xs" color={colors.textMuted} style={styles.statLabel}>Entry Fee</AppText>
                        <AppText variant="sm" fontWeight="bold" color={colors.success} numberOfLines={1}>{entryFee}</AppText>
                    </View>
                </View>

                {/* Room Details Box */}
                {!isRoomDetailsAvailable ? (
                    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.lockedBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <View style={[styles.lockIconBox, { backgroundColor: colors.border }]}>
                            <MaterialIcons name="lock" size={20} color={colors.textMuted} />
                        </View>
                        <AppText variant="sm" color={colors.textMuted} style={{ textAlign: 'center', maxWidth: '80%' }}>
                            Room ID & Password will be available <AppText variant="sm" fontWeight="bold" color={colors.text}>15 mins</AppText> before match starts.
                        </AppText>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.liveBox, { backgroundColor: colors.success + '1A', borderColor: colors.success + '40' }]}>
                        <View style={styles.liveDetailRow}>
                            <View style={{ flex: 1 }}>
                                <AppText variant="xs" color={colors.textMuted} style={{ textTransform: 'uppercase', marginBottom: 2 }}>Room ID</AppText>
                                <AppText variant="md" fontWeight="bold" color={colors.text}>{roomId}</AppText>
                            </View>
                            <TouchableOpacity style={[styles.copyBtn, { backgroundColor: colors.success + '30' }]} onPress={() => handleCopy(roomId)}>
                                <MaterialIcons name="content-copy" size={18} color={colors.success} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.success + '20' }]} />
                        <View style={styles.liveDetailRow}>
                            <View style={{ flex: 1 }}>
                                <AppText variant="xs" color={colors.textMuted} style={{ textTransform: 'uppercase', marginBottom: 2 }}>Password</AppText>
                                <AppText variant="md" fontWeight="bold" color={colors.text}>{roomPassword}</AppText>
                            </View>
                            <TouchableOpacity style={[styles.copyBtn, { backgroundColor: colors.success + '30' }]} onPress={() => handleCopy(roomPassword)}>
                                <MaterialIcons name="content-copy" size={18} color={colors.success} />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 16,
    },
    decorationBlur: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 128,
        height: 128,
        borderRadius: 64,
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 4,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    statLabel: {
        marginBottom: 2,
    },
    lockedBox: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    lockIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveBox: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
    },
    liveDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 12,
    },
    copyBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
