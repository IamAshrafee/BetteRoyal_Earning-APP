import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserBalanceHeader } from '../../../components/specific/UserBalanceHeader';

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
    });

    return (
        <View style={styles.container}>
            <View>
                <AppText variant="sm" color={colors.textMuted} fontWeight="medium">
                    Welcome back,
                </AppText>
                <AppText variant="lg" fontWeight="bold">
                    Hi, Ashrafee
                </AppText>
            </View>

            <UserBalanceHeader
                label="Balance"
                balance="1,986"
                currencySymbol="৳"
                profileImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDg4UDBnRIO-qaFvV14sUmeIn1eJAlV7DWyy2MJr-JJte0IiuvmRtpCFAGnFGmwmhMgT-u5D6cYiqYMukiigTmsJ3BXhgLdk0ScoBvycCp7tObxfUHjjKbbTeaIPUpI9uvIJyIKuiEp-1WNQB0N_-puX2KjfVhXl46kPwinhp4aPf7mIMGJLm7o2apR_hqx3HubxQjxNH3DknHYnpwbLwAolSh362vCKf7ljHVvlBug7Ed7K7X9Zl1pH3qSf4zQ4l2627kbAa1H4g"
                onProfilePress={() => console.log('Profile pressed')}
                onBalancePress={() => console.log('Balance pressed')}
            />
        </View>
    );
};
