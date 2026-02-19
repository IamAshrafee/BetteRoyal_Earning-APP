import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For coins/fa icons
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { AppBox } from '../../../components/shared/AppBox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeHeader = () => {
    const { colors, spacing, shadows } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.md,
            paddingTop: insets.top + spacing.sm,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.background,
            zIndex: 10,
        },
        userSection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
        },
        avatarContainer: {
            position: 'relative',
        },
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: colors.primary,
        },
        onlineBadge: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 12,
            height: 12,
            backgroundColor: colors.success,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: colors.background,
        },
        balanceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors.border,
            ...shadows.card,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.userSection}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg4UDBnRIO-qaFvV14sUmeIn1eJAlV7DWyy2MJr-JJte0IiuvmRtpCFAGnFGmwmhMgT-u5D6cYiqYMukiigTmsJ3BXhgLdk0ScoBvycCp7tObxfUHjjKbbTeaIPUpI9uvIJyIKuiEp-1WNQB0N_-puX2KjfVhXl46kPwinhp4aPf7mIMGJLm7o2apR_hqx3HubxQjxNH3DknHYnpwbLwAolSh362vCKf7ljHVvlBug7Ed7K7X9Zl1pH3qSf4zQ4l2627kbAa1H4g' }}
                        style={styles.avatar}
                    />
                    <View style={styles.onlineBadge} />
                </View>
                <View>
                    <AppText variant="sm" color={colors.textMuted} fontWeight="medium">
                        Welcome back,
                    </AppText>
                    <AppText variant="lg" fontWeight="bold">
                        Hi, Ashrafee
                    </AppText>
                </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
                <AppText variant="xs" color={colors.textMuted} style={{ marginBottom: 4 }}>
                    Account
                </AppText>
                <View style={styles.balanceContainer}>
                    <FontAwesome name="database" size={14} color="#FF9500" />
                    <AppText variant="sm" fontWeight="bold" color={colors.primary}>
                        1,986 BTC
                    </AppText>
                </View>
            </View>
        </View>
    );
};
