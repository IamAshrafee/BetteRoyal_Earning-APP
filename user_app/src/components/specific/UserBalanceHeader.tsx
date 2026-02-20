import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';

interface UserBalanceHeaderProps {
    balance: string; // e.g., "1,986"
    currencySymbol?: string; // e.g., "৳" or "BTC"
    profileImage: string;
    label?: string; // e.g. "Balance"
    variant?: 'default' | 'glass'; // Style variant
    onProfilePress?: () => void;
    onBalancePress?: () => void;
}

export const UserBalanceHeader = ({
    balance,
    currencySymbol = 'BTC',
    profileImage,
    label = 'Balance',
    variant = 'default',
    onProfilePress,
    onBalancePress,
}: UserBalanceHeaderProps) => {
    const { colors, spacing, radius } = useTheme();
    const isGlass = variant === 'glass';

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm, // gap-3 (~12px)
            ...(isGlass && {
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Pseudo backdrop blur
                paddingVertical: 6,
                paddingLeft: 12, // Enough for text
                paddingRight: 6, // Snug around the avatar
                borderRadius: 999,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
            }),
        },
        balanceColumn: {
            alignItems: 'flex-end',
        },
        profileContainer: {
            width: 40, // Match default
            height: 40,
            borderRadius: radius.full,
            overflow: 'hidden',
            borderWidth: 2, // Match default
            borderColor: isGlass ? 'rgba(255, 255, 255, 0.5)' : colors.surface,
            backgroundColor: colors.surface,
        },
        avatar: {
            width: '100%',
            height: '100%',
        }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onBalancePress}
                style={styles.balanceColumn}
            >
                <AppText
                    style={{
                        fontSize: 10,
                        lineHeight: 14,
                        color: isGlass ? 'rgba(255, 255, 255, 0.8)' : colors.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: 0.8, // tracking-wider
                        fontWeight: '500', // font-medium
                    }}
                >
                    {label}
                </AppText>
                <AppText
                    variant="sm" // text-sm
                    fontWeight="bold"
                    color={isGlass ? '#FFFFFF' : colors.primary}
                >
                    {currencySymbol} {balance}
                </AppText>
            </TouchableOpacity>

            <Pressable onPress={onProfilePress} style={styles.profileContainer}>
                <Image
                    source={{ uri: profileImage }}
                    style={styles.avatar}
                />
            </Pressable>
        </View>
    );
};
