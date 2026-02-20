import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, Layout } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../shared/AppText';

export type MatchMode = 'upcoming' | 'history';

interface MatchModeToggleProps {
    mode: MatchMode;
    onModeChange: (mode: MatchMode) => void;
}

export const MatchModeToggle: React.FC<MatchModeToggleProps> = ({ mode, onModeChange }) => {
    const { colors, spacing, radius, shadows } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background, padding: 4, borderRadius: 16 }]}>
            <View style={{ flexDirection: 'row', position: 'relative' }}>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => onModeChange('upcoming')}
                    activeOpacity={1}
                >
                    {mode === 'upcoming' && (
                        <Animated.View
                            layout={Layout.springify().mass(0.2).damping(16).stiffness(150)}
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: colors.primary, borderRadius: 12, ...shadows.sm }
                            ]}
                        />
                    )}
                    <AppText
                        variant="sm"
                        fontWeight="bold"
                        color={mode === 'upcoming' ? '#FFFFFF' : colors.textMuted}
                        style={{ zIndex: 1, textAlign: 'center' }}
                    >
                        Upcoming
                    </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => onModeChange('history')}
                    activeOpacity={1}
                >
                    {mode === 'history' && (
                        <Animated.View
                            layout={Layout.springify().mass(0.2).damping(16).stiffness(150)}
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: colors.primary, borderRadius: 12, ...shadows.sm }
                            ]}
                        />
                    )}
                    <AppText
                        variant="sm"
                        fontWeight="bold"
                        color={mode === 'history' ? '#FFFFFF' : colors.textMuted}
                        style={{ zIndex: 1, textAlign: 'center' }}
                    >
                        History
                    </AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
