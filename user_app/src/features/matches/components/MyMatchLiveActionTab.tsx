import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../../../components/shared/AppText';
import { useTheme } from '../../../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';


type MatchStatus = 'PENDING' | 'CALCULATING' | 'COMPLETED';

interface Props {
    status: MatchStatus;
}

const MOCK_JOINED_PLAYERS = [
    { id: 'p1', name: 'KillerInstinct', avatar: null, initial: 'K', gradientFrom: '#60A5FA', gradientTo: '#6366F1', isMe: false },
    { id: 'p2', name: 'DarkLord_99', avatar: 'https://i.pravatar.cc/100?img=12', initial: '', gradientFrom: '', gradientTo: '', isMe: false },
    { id: 'p3', name: 'VenomStrike', avatar: null, initial: 'V', gradientFrom: '#34D399', gradientTo: '#14B8A6', isMe: false },
];
const MY_PLAYER = { id: 'me', name: 'You (Striker007)', avatar: 'https://i.pravatar.cc/100?img=5', joinIndex: 38, isMe: true };
const TOTAL_SLOTS = 48;
const JOINED_COUNT = 42;

const MOCK_LEADERBOARD = [
    { rank: 1, name: 'Viper_X', kills: 12, won: '৳ 250', avatar: 'https://i.pravatar.cc/100?img=14', isMe: false, isTop: true },
    { rank: 2, name: 'Shadow_007', kills: 8, won: '৳ 120', avatar: 'https://i.pravatar.cc/100?img=33', isMe: false, isTop: false },
    { rank: 3, name: 'Killer_Queen', kills: 5, won: '৳ 80', avatar: 'https://i.pravatar.cc/100?img=47', isMe: false, isTop: false },
    { rank: 4, name: 'You', kills: 3, won: '৳ 30', avatar: 'https://i.pravatar.cc/100?img=5', isMe: true, isTop: false },
    { rank: 5, name: 'Noob_Master', kills: 2, won: '-', avatar: 'https://i.pravatar.cc/100?img=60', isMe: false, isTop: false },
    { rank: 6, name: 'SniperWolf', kills: 1, won: '-', avatar: 'https://i.pravatar.cc/100?img=65', isMe: false, isTop: false },
];

export const MyMatchLiveActionTab: React.FC<Props> = ({ status }) => {
    const { colors, spacing, shadows } = useTheme();

    // ─── STATE 1: STARTING SOON ────────────────────────────────────
    const renderStartingSoon = () => {
        const isUnlocked = true;

        return (
            <Animated.View entering={FadeIn.duration(300)} style={styles.stateContainer}>
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                    <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={styles.countdownLabel}>
                        MATCH STARTS IN
                    </AppText>

                    <View style={styles.countdownRow}>
                        <View style={[styles.countdownBox, { backgroundColor: colors.primary + '15' }]}>
                            <AppText variant="xxl" fontWeight="bold" color={colors.primary}>00</AppText>
                            <AppText variant="xs" fontWeight="medium" color={colors.primary} style={{ opacity: 0.8 }}>HRS</AppText>
                        </View>
                        <AppText variant="xl" fontWeight="bold" color={colors.primary}>:</AppText>
                        <View style={[styles.countdownBox, { backgroundColor: colors.primary + '15' }]}>
                            <AppText variant="xxl" fontWeight="bold" color={colors.primary}>45</AppText>
                            <AppText variant="xs" fontWeight="medium" color={colors.primary} style={{ opacity: 0.8 }}>MIN</AppText>
                        </View>
                        <AppText variant="xl" fontWeight="bold" color={colors.primary}>:</AppText>
                        <View style={[styles.countdownBox, { backgroundColor: colors.primary + '15' }]}>
                            <AppText variant="xxl" fontWeight="bold" color={colors.primary}>12</AppText>
                            <AppText variant="xs" fontWeight="medium" color={colors.primary} style={{ opacity: 0.8 }}>SEC</AppText>
                        </View>
                    </View>

                    {isUnlocked ? (
                        <View style={[styles.credentialsBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <View style={[styles.credRow, { borderBottomColor: colors.border }]}>
                                <View>
                                    <AppText variant="xs" color={colors.textMuted}>Room ID</AppText>
                                    <AppText variant="lg" fontWeight="bold" color={colors.text} style={{ fontFamily: 'monospace', letterSpacing: 1 }}>12345678</AppText>
                                </View>
                                <TouchableOpacity style={[styles.copyButton, { backgroundColor: colors.primary + '15' }]}>
                                    <MaterialIcons name="content-copy" size={14} color={colors.primary} />
                                    <AppText variant="xs" fontWeight="bold" color={colors.primary}>COPY</AppText>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.credRow}>
                                <View>
                                    <AppText variant="xs" color={colors.textMuted}>Password</AppText>
                                    <AppText variant="lg" fontWeight="bold" color={colors.text} style={{ fontFamily: 'monospace', letterSpacing: 1 }}>9090</AppText>
                                </View>
                                <TouchableOpacity style={[styles.copyButton, { backgroundColor: colors.primary + '15' }]}>
                                    <MaterialIcons name="content-copy" size={14} color={colors.primary} />
                                    <AppText variant="xs" fontWeight="bold" color={colors.primary}>COPY</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.lockedBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <MaterialIcons name="lock" size={24} color={colors.textMuted} style={{ marginBottom: 8 }} />
                            <AppText variant="sm" color={colors.textMuted} style={{ textAlign: 'center' }}>
                                Room ID & Password will appear here 15 minutes before the match.
                            </AppText>
                        </View>
                    )}

                    <View style={styles.credentialNote}>
                        <MaterialIcons name="info" size={16} color="#EAB308" />
                        <AppText variant="xs" color={colors.textMuted}>Credentials update 15m before start</AppText>
                    </View>
                </View>

                <View style={styles.leaderboardSection}>
                    <View style={styles.joinedHeader}>
                        <AppText variant="lg" fontWeight="bold" color={colors.text}>Joined Players</AppText>
                        <View style={[styles.countBadge, { backgroundColor: colors.border + '60' }]}>
                            <AppText variant="xs" fontWeight="medium" color={colors.textMuted}>{JOINED_COUNT}/{TOTAL_SLOTS}</AppText>
                        </View>
                    </View>

                    <View style={styles.leaderboardHeaderRow}>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 2 }}>NO.</AppText>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 6 }}>PLAYER / TEAM</AppText>
                    </View>

                    {MOCK_JOINED_PLAYERS.map((player, i) => (
                        <View
                            key={player.id}
                            style={[
                                styles.leaderboardRow,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border,
                                    ...shadows.soft,
                                },
                            ]}
                        >
                            <View style={[styles.rankBox, { backgroundColor: colors.background }]}>
                                <AppText variant="sm" fontWeight="bold" color={colors.textMuted}>
                                    {String(i + 1).padStart(2, '0')}
                                </AppText>
                            </View>
                            <View style={[styles.playerInfo, { flex: 6 }]}>
                                {player.avatar ? (
                                    <Image source={{ uri: player.avatar }} style={styles.playerAvatar} />
                                ) : (
                                    <View style={[styles.playerAvatarPlaceholder, { backgroundColor: player.gradientFrom }]}>
                                        <AppText variant="xs" fontWeight="bold" color="#FFFFFF">{player.initial}</AppText>
                                    </View>
                                )}
                                <AppText variant="sm" fontWeight="medium" color={colors.text}>{player.name}</AppText>
                            </View>
                        </View>
                    ))}

                    <View
                        style={[
                            styles.leaderboardRow,
                            {
                                backgroundColor: colors.primary + '08',
                                borderColor: colors.primary + '30',
                                ...shadows.soft,
                            },
                        ]}
                    >
                        <View style={[styles.meStripe, { backgroundColor: colors.primary }]} />
                        <View style={[styles.rankBox, { backgroundColor: colors.primary }]}>
                            <AppText variant="sm" fontWeight="bold" color="#FFFFFF">
                                {MY_PLAYER.joinIndex}
                            </AppText>
                        </View>
                        <View style={[styles.playerInfo, { flex: 6 }]}>
                            <Image source={{ uri: MY_PLAYER.avatar }} style={[styles.playerAvatar, { borderWidth: 2, borderColor: colors.primary }]} />
                            <AppText variant="sm" fontWeight="bold" color={colors.primary}>{MY_PLAYER.name}</AppText>
                            <View style={[styles.meBadge, { backgroundColor: colors.primary }]}>
                                <AppText variant="xs" fontWeight="bold" color="#FFFFFF" style={{ fontSize: 9 }}>ME</AppText>
                            </View>
                        </View>
                    </View>

                    {[JOINED_COUNT + 1, JOINED_COUNT + 2, JOINED_COUNT + 3].map(num => (
                        <View
                            key={num}
                            style={[
                                styles.leaderboardRow,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border,
                                    opacity: 0.6,
                                    ...shadows.soft,
                                },
                            ]}
                        >
                            <View style={[styles.rankBox, { backgroundColor: colors.background }]}>
                                <AppText variant="sm" fontWeight="medium" color={colors.textMuted}>{num}</AppText>
                            </View>
                            <AppText variant="sm" color={colors.textMuted} style={{ fontStyle: 'italic', marginLeft: 10 }}>-- Empty --</AppText>
                        </View>
                    ))}

                    <TouchableOpacity style={[styles.viewFullBtnCard, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                        <AppText variant="xs" fontWeight="bold" color={colors.primary}>VIEW FULL LIST</AppText>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    // ─── STATE 2: CALCULATING ──────────────────────────────────────
    const renderCalculating = () => {
        return (
            <Animated.View entering={FadeIn.duration(300)} style={styles.stateContainer}>
                <View style={styles.calcHeroSection}>
                    <View style={styles.calcIconContainer}>
                        <View style={[styles.calcIconOuter, { backgroundColor: colors.primary + '10' }]} />
                        <View style={[styles.calcIconMiddle, { backgroundColor: colors.primary + '20' }]} />
                        <View style={[styles.calcIconInner, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                            <MaterialIcons name="hourglass-top" size={36} color={colors.primary} />
                        </View>
                    </View>
                    <AppText variant="xxl" fontWeight="bold" color={colors.text} style={{ marginBottom: 8, textAlign: 'center' }}>
                        Result Calculating...
                    </AppText>
                    <AppText variant="sm" color={colors.textMuted} style={{ textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 }}>
                        Our system is verifying match scores. Please keep your screenshots ready in case of any disputes.
                    </AppText>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                    <View style={styles.timelineContainer}>
                        <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />

                        <View style={styles.timelineStep}>
                            <View style={[styles.timelineCircle, { backgroundColor: '#D1FAE5', borderColor: '#10B981' }]}>
                                <MaterialIcons name="check" size={18} color="#10B981" />
                            </View>
                            <View style={styles.timelineText}>
                                <AppText variant="sm" fontWeight="bold" color={colors.text}>Match Ended</AppText>
                                <AppText variant="xs" color={colors.textMuted}>10:45 PM • Successfully completed</AppText>
                            </View>
                        </View>

                        <View style={styles.timelineStep}>
                            <View style={[styles.timelineCircle, styles.timelineCircleActive, { borderColor: colors.primary, backgroundColor: colors.surface }]}>
                                <MaterialIcons name="search" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.timelineText}>
                                <AppText variant="sm" fontWeight="bold" color={colors.primary}>Verifying Scores</AppText>
                                <AppText variant="xs" color={colors.textMuted}>Analyzing player stats & results...</AppText>
                            </View>
                        </View>

                        <View style={[styles.timelineStep, { opacity: 0.5 }]}>
                            <View style={[styles.timelineCircle, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                <MaterialIcons name="emoji-events" size={18} color={colors.textMuted} />
                            </View>
                            <View style={styles.timelineText}>
                                <AppText variant="sm" fontWeight="bold" color={colors.textMuted}>Distribute Rewards</AppText>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.soft }]}>
                    <View style={styles.uploadHeader}>
                        <AppText variant="md" fontWeight="bold" color={colors.text}>Upload Proof</AppText>
                        <View style={[styles.optionalBadge, { backgroundColor: '#DBEAFE' }]}>
                            <AppText variant="xs" fontWeight="bold" color="#2563EB">Optional</AppText>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.uploadDropzone, { borderColor: colors.border, backgroundColor: colors.background }]}>
                        <View style={[styles.uploadIconCircle, { backgroundColor: colors.surface }]}>
                            <MaterialIcons name="cloud-upload" size={24} color={colors.textMuted} />
                        </View>
                        <AppText variant="sm" fontWeight="bold" color={colors.text} style={{ marginBottom: 4 }}>Upload Screenshot</AppText>
                        <AppText variant="xs" color={colors.textMuted}>JPEG or PNG only. Max size 5MB.</AppText>
                        <View style={[styles.chooseFileBtn, { backgroundColor: colors.text }]}>
                            <AppText variant="xs" fontWeight="bold" color={colors.surface}>Choose File</AppText>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    // ─── STATE 3: COMPLETED ────────────────────────────────────────
    const renderCompleted = () => {
        const myResult = MOCK_LEADERBOARD.find(p => p.isMe);

        return (
            <Animated.View entering={FadeIn.duration(300)} style={styles.stateContainer}>
                {myResult && (
                    <View
                        style={[styles.resultCard, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', ...shadows.soft }]}
                    >
                        <View style={styles.resultCardHeader}>
                            <View style={styles.resultTitleRow}>
                                <View style={[styles.resultIcon, { backgroundColor: '#D1FAE5' }]}>
                                    <MaterialIcons name="emoji-events" size={16} color="#10B981" />
                                </View>
                                <AppText variant="sm" fontWeight="bold" color="#4B5563">Your Result</AppText>
                            </View>
                            <View style={[styles.completedBadge, { backgroundColor: '#D1FAE5' }]}>
                                <AppText variant="xs" fontWeight="bold" color="#047857">COMPLETED</AppText>
                            </View>
                        </View>
                        <View style={styles.resultGrid}>
                            <View style={styles.resultCol}>
                                <AppText variant="xs" color="#6B7280" style={styles.resultLabel}>RANK</AppText>
                                <AppText variant="xxl" fontWeight="bold" color="#1F2937">#{myResult.rank}</AppText>
                            </View>
                            <View style={[styles.resultDivider, { backgroundColor: '#A7F3D0' }]} />
                            <View style={styles.resultCol}>
                                <AppText variant="xs" color="#6B7280" style={styles.resultLabel}>KILLS</AppText>
                                <AppText variant="xxl" fontWeight="bold" color="#1F2937">{myResult.kills}</AppText>
                            </View>
                            <View style={[styles.resultDivider, { backgroundColor: '#A7F3D0' }]} />
                            <View style={styles.resultCol}>
                                <AppText variant="xs" color="#6B7280" style={styles.resultLabel}>WINNINGS</AppText>
                                <AppText variant="xxl" fontWeight="bold" color="#10B981">{myResult.won}</AppText>
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.leaderboardSection}>
                    <View style={styles.joinedHeader}>
                        <AppText variant="lg" fontWeight="bold" color={colors.text}>Leaderboard</AppText>
                        <View style={[styles.countBadge, { backgroundColor: colors.border + '60' }]}>
                            <AppText variant="xs" fontWeight="medium" color={colors.textMuted}>48 Players</AppText>
                        </View>
                    </View>

                    <View style={styles.leaderboardHeaderRow}>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 2 }}>RANK</AppText>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 5 }}>PLAYER</AppText>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 2, textAlign: 'center' }}>KILLS</AppText>
                        <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ flex: 2, textAlign: 'right' }}>WON</AppText>
                    </View>

                    {MOCK_LEADERBOARD.map((player) => (
                        <View
                            key={player.rank}
                            style={[
                                styles.leaderboardRow,
                                {
                                    backgroundColor: player.isMe ? colors.primary + '08' : colors.surface,
                                    borderColor: player.isMe ? colors.primary + '30' : colors.border,
                                    ...shadows.soft,
                                },
                            ]}
                        >
                            {player.isMe && <View style={[styles.meStripe, { backgroundColor: colors.primary }]} />}
                            <View style={[
                                styles.rankBox,
                                {
                                    backgroundColor: player.rank === 1 ? '#FEF3C7' : player.isMe ? colors.primary : colors.background,
                                }
                            ]}>
                                <AppText
                                    variant="sm"
                                    fontWeight="bold"
                                    color={player.rank === 1 ? '#D97706' : player.isMe ? '#FFFFFF' : colors.textMuted}
                                >
                                    {player.rank}
                                </AppText>
                            </View>
                            <View style={[styles.playerInfo, { flex: 5 }]}>
                                <Image
                                    source={{ uri: player.avatar }}
                                    style={[styles.playerAvatar, !player.isMe && player.won === '-' && { opacity: 0.5 }]}
                                />
                                <AppText
                                    variant="sm"
                                    fontWeight={player.isMe ? 'bold' : 'medium'}
                                    color={player.isMe ? colors.primary : player.won === '-' ? colors.textMuted : colors.text}
                                >
                                    {player.name}
                                </AppText>
                            </View>
                            <AppText
                                variant="sm"
                                fontWeight="bold"
                                color={colors.text}
                                style={{ flex: 2, textAlign: 'center' }}
                            >
                                {player.kills}
                            </AppText>
                            <AppText
                                variant="sm"
                                fontWeight="bold"
                                color={player.won !== '-' ? '#10B981' : colors.textMuted}
                                style={{ flex: 2, textAlign: 'right' }}
                            >
                                {player.won}
                            </AppText>
                        </View>
                    ))}
                </View>
            </Animated.View>
        );
    };

    return (
        <Animated.View layout={LinearTransition} style={[styles.container, { padding: spacing.md }]}>
            {status === 'PENDING' && renderStartingSoon()}
            {status === 'CALCULATING' && renderCalculating()}
            {status === 'COMPLETED' && renderCompleted()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    stateContainer: { flex: 1 },

    // Shared card style
    card: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        marginBottom: 20,
    },

    // ── Countdown ──
    countdownLabel: { textAlign: 'center', letterSpacing: 2, marginBottom: 12 },
    countdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
    },
    countdownBox: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 6,
        minWidth: 60,
        alignItems: 'center',
    },

    // ── Credentials ──
    credentialsBox: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },
    credRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    lockedBox: {
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    credentialNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 16,
    },

    // ── Player Table ──
    joinedSection: { marginBottom: 20 },
    joinedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    countBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    playerTable: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    tableHeaderRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    colNo: { width: 50, textAlign: 'center' },
    colPlayer: { flex: 1 },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    playerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    playerAvatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    meBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        marginLeft: 'auto',
    },
    viewFullBtn: {
        paddingVertical: 14,
        alignItems: 'center',
        borderTopWidth: 1,
    },

    // ── Calculating ──
    calcHeroSection: {
        alignItems: 'center',
        paddingVertical: 24,
        marginBottom: 8,
    },
    calcIconContainer: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    calcIconOuter: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    calcIconMiddle: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    calcIconInner: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        zIndex: 10,
    },
    timelineContainer: {
        position: 'relative',
        paddingLeft: 4,
    },
    timelineLine: {
        position: 'absolute',
        left: 27,
        top: 40,
        bottom: 40,
        width: 2,
    },
    timelineStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    timelineCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        zIndex: 10,
    },
    timelineCircleActive: {
        shadowColor: '#FF4757',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    timelineText: {
        paddingTop: 4,
        flex: 1,
    },

    // ── Upload ──
    uploadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    optionalBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    uploadDropzone: {
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        paddingVertical: 24,
        alignItems: 'center',
    },
    uploadIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 2,
    },
    chooseFileBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 16,
    },

    // ── Results ──
    resultCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        marginBottom: 24,
        overflow: 'hidden',
    },
    resultCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    resultTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    resultIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completedBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    resultGrid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resultCol: {
        flex: 1,
        alignItems: 'center',
    },
    resultLabel: {
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    resultDivider: {
        width: 1,
        height: 40,
    },

    // ── Leaderboard ──
    leaderboardSection: { marginBottom: 20 },
    leaderboardHeaderRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    leaderboardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
        overflow: 'hidden',
    },
    meStripe: {
        position: 'absolute',
        left: 0,
        top: '25%',
        width: 3,
        height: '50%',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
    rankBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    viewFullBtnCard: {
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
    },
});
