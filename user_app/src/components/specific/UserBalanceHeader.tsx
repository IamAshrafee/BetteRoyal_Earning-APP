import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';

interface UserBalanceHeaderProps {
    balance: string; // e.g., "1,986"
    currencySymbol?: string; // e.g., "৳" or "BTC"
    profileImage: string;
    label?: string; // e.g. "Balance"
    onProfilePress?: () => void;
    onBalancePress?: () => void;
}

export const UserBalanceHeader = ({
    balance,
    currencySymbol = 'BTC',
    profileImage,
    label = 'Balance',
    onProfilePress,
    onBalancePress,
}: UserBalanceHeaderProps) => {
    const { colors, spacing, radius } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm, // gap-3 (~12px)
        },
        balanceColumn: {
            alignItems: 'flex-end',
        },
        profileContainer: {
            width: 40, // h-10 w-10
            height: 40,
            borderRadius: radius.full,
            overflow: 'hidden',
            borderWidth: 2, // ring-2
            borderColor: colors.surface, // ring-gray-100 / dark:ring-gray-800
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
                        color: colors.textMuted,
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
                    color={colors.primary}
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
