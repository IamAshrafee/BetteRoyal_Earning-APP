import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppButtonProps extends TouchableOpacityProps {
    title?: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost' | 'social';
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    iconRight?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    children?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
    iconRight = false,
    style,
    textStyle,
    children,
    ...props
}) => {
    const { colors, typography } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return colors.textMuted + '50';
        switch (variant) {
            case 'primary': return colors.primary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            case 'social': return colors.surface;
            default: return colors.primary;
        }
    };

    const getBorderColor = () => {
        switch (variant) {
            case 'outline': return colors.border;
            case 'social': return colors.border;
            default: return 'transparent';
        }
    };

    const getTextColor = () => {
        if (disabled) return colors.surface;
        switch (variant) {
            case 'primary': return '#FFFFFF';
            case 'outline': return colors.text;
            case 'ghost': return colors.primary;
            case 'social': return colors.text;
            default: return '#FFFFFF';
        }
    };

    const buttonStyle: ViewStyle = {
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: variant === 'outline' || variant === 'social' ? 1 : 0,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.7 : 1,
        ...style,
    };

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon && !iconRight && (
                        <Icon name={icon} size={20} color={getTextColor()} style={{ marginRight: title ? 8 : 0 }} />
                    )}
                    {title && (
                        <AppText
                            variant="md"
                            fontWeight="medium"
                            color={getTextColor()}
                            style={textStyle}
                        >
                            {title}
                        </AppText>
                    )}
                    {children}
                    {icon && iconRight && (
                        <Icon name={icon} size={20} color={getTextColor()} style={{ marginLeft: title ? 8 : 0 }} />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};
