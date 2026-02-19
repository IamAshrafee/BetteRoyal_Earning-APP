import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface AppCardProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'elevated' | 'outlined' | 'flat';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: ViewStyle;
}

export const AppCard: React.FC<AppCardProps> = ({
    children,
    onPress,
    variant = 'elevated',
    padding = 'md',
    style,
}) => {
    const { colors, spacing, radius, shadows } = useTheme();

    const getPadding = () => {
        switch (padding) {
            case 'none': return 0;
            case 'sm': return spacing.sm;
            case 'md': return spacing.md;
            case 'lg': return spacing.lg;
            default: return spacing.md;
        }
    };

    const cardStyle: ViewStyle = {
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: getPadding(),
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor: colors.border,
        ...(variant === 'elevated' ? shadows.card : {}),
        ...style,
    };

    if (onPress) {
        return (
            <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyle}>{children}</View>;
};
