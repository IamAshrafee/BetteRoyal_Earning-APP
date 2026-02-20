import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Animated, { LinearTransition, FadeInRight, FadeOutRight } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

export type TabType = 'home' | 'matches' | 'wallet' | 'profile';

export interface AppBottomNavigationProps {
    activeTab: TabType;
    onTabPress: (tab: TabType) => void;
    profileImageUri?: string;
    variant?: 'default' | 'glass';
}

const TABS: { id: TabType; icon: string; label: string }[] = [
    { id: 'home', icon: 'home', label: 'HOME' },
    { id: 'matches', icon: 'sports-esports', label: 'MATCHES' },
    { id: 'wallet', icon: 'account-balance-wallet', label: 'WALLET' },
    { id: 'profile', icon: 'person', label: 'PROFILE' },
];

export const AppBottomNavigation: React.FC<AppBottomNavigationProps> = ({
    activeTab,
    onTabPress,
    profileImageUri,
    variant = 'default'
}) => {
    const { colors, spacing, shadows } = useTheme();

    const isGlass = variant === 'glass';

    return (
        <View style={styles.container}>
            <View style={[
                styles.navBar,
                {
                    backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.2)' : colors.surface,
                    borderColor: isGlass ? 'rgba(255, 255, 255, 0.1)' : colors.border,
                    ...(!isGlass && shadows.card),
                }
            ]}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <Animated.View
                            key={tab.id}
                            layout={LinearTransition.springify().mass(0.5).damping(14).stiffness(150)}
                            style={[
                                isActive ? styles.activeTab : styles.inactiveTab,
                                isActive && { backgroundColor: colors.primary, ...shadows.glow }
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => onTabPress(tab.id)}
                                activeOpacity={0.8}
                                style={styles.touchableContent}
                            >
                                {/* Profile Image Logic */}
                                {tab.id === 'profile' && profileImageUri ? (
                                    <View style={[styles.profileImageContainer, { borderColor: isGlass ? 'rgba(255,255,255,0.1)' : colors.border }]}>
                                        <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
                                    </View>
                                ) : (
                                    <MaterialIcons
                                        name={tab.icon}
                                        size={isActive ? 22 : 24}
                                        color={isActive ? "#FFFFFF" : (isGlass ? '#FFFFFF' : colors.textMuted)}
                                        style={(!isActive && isGlass) ? { opacity: 0.7 } : undefined}
                                    />
                                )}

                                {/* Active Label Logic */}
                                {isActive && (
                                    <Animated.View
                                        entering={FadeInRight.duration(200)}
                                        exiting={FadeOutRight.duration(150)}
                                    >
                                        <AppText variant="sm" fontWeight="semiBold" color="#FFFFFF" style={{ marginLeft: spacing.sm, letterSpacing: 0.5 }}>
                                            {tab.label}
                                        </AppText>
                                    </Animated.View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 34 : 24, // Safe area styling
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
    },
    activeTab: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    inactiveTab: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    touchableContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    profileImageContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
        borderWidth: 2,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});
