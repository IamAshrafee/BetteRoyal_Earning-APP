import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

interface AppBadgeProps {
    label: string;
    variant?: 'primary' | 'success' | 'warning' | 'info' | 'error' | 'neutral';
    style?: ViewStyle;
}

export const AppBadge: React.FC<AppBadgeProps> = ({
    label,
    variant = 'primary',
    style,
}) => {
    const { colors, spacing, radius } = useTheme();

    const getColors = () => {
        switch (variant) {
            case 'primary': return { bg: colors.primary + '20', text: colors.primary };
            case 'success': return { bg: colors.success + '20', text: colors.success };
            case 'warning': return { bg: colors.warning + '20', text: colors.warning };
            case 'info': return { bg: colors.info + '20', text: colors.info };
            case 'error': return { bg: colors.error + '20', text: colors.error };
            case 'neutral': return { bg: colors.textMuted + '20', text: colors.textMuted };
            default: return { bg: colors.primary + '20', text: colors.primary };
        }
    };

    const badgeColors = getColors();

    const badgeStyle: ViewStyle = {
        backgroundColor: badgeColors.bg,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: radius.sm,
        alignSelf: 'flex-start',
        ...style,
    };

    return (
        <View style={badgeStyle}>
            <AppText variant="xs" fontWeight="semiBold" color={badgeColors.text}>
                {label}
            </AppText>
        </View>
    );
};
