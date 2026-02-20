import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { AppInput } from '../../../components/shared/AppInput';
import { AppButton } from '../../../components/shared/AppButton';

interface JoinMatchSheetProps {
    visible: boolean;
    onClose: () => void;
    matchType: 'Solo' | 'Duo' | 'Squad';
    entryFee: number;
    walletBalance: number;
}

export const JoinMatchSheet: React.FC<JoinMatchSheetProps> = ({
    visible,
    onClose,
    matchType,
    entryFee,
    walletBalance
}) => {
    const { colors, spacing, radius, typography, theme } = useTheme();
    const isDark = theme === 'dark';

    // Internal state to keep Modal mounted during closing animations
    const [internalVisible, setInternalVisible] = useState(false);

    // Animation Values
    const [slideAnim] = useState(new Animated.Value(900)); // Start far below screen
    const [fadeAnim] = useState(new Animated.Value(0));    // Start transparent

    useEffect(() => {
        if (visible) {
            setInternalVisible(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 65,
                    friction: 10,
                })
            ]).start();
        } else if (internalVisible) {
            // Parent toggled visible to false, but we are still mounted
            closeAnimation(() => setInternalVisible(false));
        }
    }, [visible]);

    const closeAnimation = (callback: () => void) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 900,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(callback);
    };

    const handleClose = () => {
        closeAnimation(() => {
            setInternalVisible(false);
            onClose(); // Notify parent
        });
    };

    if (!internalVisible) return null;

    const hasEnoughFunds = walletBalance >= entryFee;

    // Determine how many inputs to show based on match type
    const getInputs = () => {
        switch (matchType) {
            case 'Solo': return [{ label: 'In-Game Name', placeholder: 'Enter In-Game Name' }];
            case 'Duo': return [
                { label: 'Player 1 Name', placeholder: 'Enter Player 1 Name' },
                { label: 'Player 2 Name', placeholder: 'Enter Player 2 Name' }
            ];
            case 'Squad': return [
                { label: 'Player 1 Name', placeholder: 'Enter Player 1 Name' },
                { label: 'Player 2 Name', placeholder: 'Enter Player 2 Name' },
                { label: 'Player 3 Name', placeholder: 'Enter Player 3 Name' },
                { label: 'Player 4 Name', placeholder: 'Enter Player 4 Name' }
            ];
            default: return [{ label: 'In-Game Name', placeholder: 'Enter In-Game Name' }];
        }
    };

    const inputsToRender = getInputs();

    return (
        <Modal
            visible={internalVisible}
            transparent={true}
            animationType="none" // Custom animation
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.overlay}
            >
                <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={handleClose}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.sheet,
                        {
                            backgroundColor: colors.surface,
                            borderTopLeftRadius: radius.lg * 1.5,
                            borderTopRightRadius: radius.lg * 1.5,
                            borderTopColor: colors.border,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: spacing.xl, paddingBottom: spacing.xl * 1.5 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Drag Handle */}
                        <View style={styles.dragHandleContainer}>
                            <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <View>
                                <AppText variant="xxl" fontWeight="bold">Join Match</AppText>
                                <AppText variant="sm" color={colors.textMuted} style={{ marginTop: 4 }}>
                                    Confirm your entry details
                                </AppText>
                            </View>
                            <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(30, 58, 138, 0.3)' : '#DBEAFE' }]}>
                                <AppText
                                    variant="xs"
                                    fontWeight="bold"
                                    style={{ color: isDark ? '#60A5FA' : '#2563EB', textTransform: 'uppercase', letterSpacing: 1 }}
                                >
                                    {matchType}
                                </AppText>
                            </View>
                        </View>

                        {/* Balance Card */}
                        <View style={[
                            styles.balanceCard,
                            {
                                backgroundColor: hasEnoughFunds ? (isDark ? colors.surface : '#F9FAFB') : (isDark ? 'rgba(127, 29, 29, 0.1)' : '#FEF2F2'),
                                borderColor: hasEnoughFunds ? colors.border : (isDark ? 'rgba(127, 29, 29, 0.3)' : '#FEE2E2')
                            }
                        ]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
                                <View>
                                    <AppText variant="sm" fontWeight="medium" color={colors.textMuted}>Entry Fee</AppText>
                                    <AppText variant="lg" fontWeight="bold">৳{entryFee.toFixed(2)}</AppText>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <AppText variant="sm" fontWeight="medium" color={colors.textMuted}>Your Wallet</AppText>
                                    <AppText variant="lg" fontWeight="bold">৳{walletBalance.toFixed(2)}</AppText>
                                </View>
                            </View>

                            {/* Conditional Bottom Row */}
                            {hasEnoughFunds ? (
                                <View style={[styles.balanceRow, { paddingTop: spacing.md, borderTopColor: colors.border, borderTopWidth: 1 }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <MaterialIcons name="check-circle" size={18} color="#16A34A" />
                                        <AppText variant="sm" fontWeight="bold" style={{ color: '#16A34A' }}>Funds Available</AppText>
                                    </View>
                                </View>
                            ) : (
                                <View style={[styles.balanceRow, { paddingTop: spacing.md, borderTopColor: isDark ? 'rgba(127, 29, 29, 0.3)' : '#FEE2E2', borderTopWidth: 1 }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <MaterialIcons name="error-outline" size={18} color={colors.primary} />
                                        <AppText variant="sm" fontWeight="bold" color={colors.primary}>Insufficient Funds</AppText>
                                    </View>
                                    <TouchableOpacity
                                        style={{ backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 }}
                                        activeOpacity={0.8}
                                    >
                                        <AppText variant="xs" fontWeight="bold" color="#FFFFFF">Add Money</AppText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        {/* Dynamic Inputs */}
                        <View style={styles.inputSection}>
                            <AppText variant="xs" fontWeight="bold" color={colors.textMuted} style={{ marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Player Details
                            </AppText>

                            {inputsToRender.map((input, index) => (
                                <View key={index} style={{ marginBottom: inputsToRender.length > 1 ? spacing.sm : 0, position: 'relative' }}>
                                    <AppInput
                                        leftIcon={index === 0 ? "person" : "person-add"}
                                        placeholder={input.placeholder}
                                        value={index === 0 ? "GamerKing99" : ""} // Mocked for design
                                        editable={index !== 0}
                                        style={index === 0 ? { backgroundColor: isDark ? '#1F2937' : '#F9FAFB' } : {}} // Gray-800 or Gray-50
                                    />
                                    {index === 0 && (
                                        <View style={{ position: 'absolute', right: 12, top: 12, backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                                            <AppText variant="xs" fontWeight="bold" color={colors.primary}>YOU</AppText>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* Action Button */}
                        <AppButton
                            disabled={!hasEnoughFunds}
                            variant="primary"
                            title={`Confirm & Pay ৳${entryFee}`}
                            onPress={() => {
                                if (hasEnoughFunds) {
                                    // Handle joining logic
                                    handleClose();
                                }
                            }}
                            style={hasEnoughFunds ? {
                                marginTop: spacing.md,
                            } : {
                                marginTop: spacing.md,
                                backgroundColor: isDark ? '#1F2937' : '#F3F4F6', // gray-800 or gray-100 equivalent when disabled
                            }}
                            textStyle={!hasEnoughFunds ? { color: isDark ? '#4B5563' : '#9CA3AF' } : {}}
                        />

                        {/* Disclaimer */}
                        <View style={{ marginTop: spacing.md, alignItems: 'center' }}>
                            <AppText variant="xs" color={colors.textMuted}>
                                By joining, you agree to our <AppText variant="xs" style={{ textDecorationLine: 'underline' }}>Tournament Rules</AppText>.
                            </AppText>
                        </View>
                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    sheet: {
        width: '100%',
        maxHeight: '90%', // Don't let it cover the whole screen if there are many inputs
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 24,
    },
    dragHandleContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    dragHandle: {
        width: 48,
        height: 6,
        borderRadius: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999, // full pill
    },
    balanceCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 24,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputSection: {
        marginBottom: 8,
    }
});
