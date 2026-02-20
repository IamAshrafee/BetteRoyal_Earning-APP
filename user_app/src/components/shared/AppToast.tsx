import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface AppToastProps {
    visible: boolean;
    message: string;
    type?: 'success' | 'info' | 'error';
    onHide?: () => void;
    duration?: number;
}

export const AppToast: React.FC<AppToastProps> = ({
    visible,
    message,
    type = 'success',
    onHide,
    duration = 2000
}) => {
    const { colors, shadows } = useTheme();

    useEffect(() => {
        if (visible && onHide) {
            const timer = setTimeout(() => {
                onHide();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration, onHide]);

    if (!visible) return null;

    let bgColor = colors.success;
    let iconName = 'check-circle';

    if (type === 'error') {
        bgColor = colors.error;
        iconName = 'error';
    } else if (type === 'info') {
        bgColor = colors.info;
        iconName = 'info';
    }

    return (
        <Animated.View
            entering={FadeInUp.springify().mass(0.5).damping(16).stiffness(150)}
            exiting={FadeOutUp}
            style={[styles.container, { backgroundColor: bgColor, ...shadows.card }]}
        >
            <MaterialIcons name={iconName} size={20} color="#FFFFFF" />
            <AppText variant="sm" fontWeight="bold" color="#FFFFFF">
                {message}
            </AppText>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60, // below header 
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 999,
        zIndex: 9999,
        elevation: 10,
    }
});
