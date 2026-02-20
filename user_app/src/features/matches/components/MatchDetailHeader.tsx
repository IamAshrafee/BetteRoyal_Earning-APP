import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { AppBackButton } from '../../../components/shared/AppBackButton';
import { UserBalanceHeader } from '../../../components/specific/UserBalanceHeader';

const { width } = Dimensions.get('window');

interface MatchDetailHeaderProps {
    title: string;
    imageUri: string;
    startTime: string; // e.g., "Starts in 24m 32s"
    balance: string;
    profileImage: string;
    onBackPress?: () => void;
}

export const MatchDetailHeader: React.FC<MatchDetailHeaderProps> = ({
    title,
    imageUri,
    startTime,
    balance,
    profileImage,
    onBackPress
}) => {
    const { colors, spacing } = useTheme();
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: imageUri }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent', colors.background]}
                    locations={[0, 0.5, 1]}
                    style={styles.gradient}
                />

                {/* Top Actions: Back Button & Balance */}
                <View style={[styles.topActions, { paddingTop: spacing.xl }]}>
                    <AppBackButton variant="glass" onPress={handleBack} />

                    <UserBalanceHeader
                        balance={balance}
                        currencySymbol="৳"
                        label="Balance"
                        profileImage={profileImage}
                        variant="glass"
                    />
                </View>

                {/* Title and Badges */}
                <View style={[styles.titleContainer, { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg }]}>
                    <View style={[styles.liveBadge, { backgroundColor: colors.primary }]}>
                        <AppText variant="xs" fontWeight="bold" color="#FFFFFF" style={{ textTransform: 'uppercase', fontSize: 10 }}>
                            Live Match
                        </AppText>
                    </View>

                    <AppText variant="xxxl" fontWeight="bold" style={styles.title} numberOfLines={2}>
                        {title}
                    </AppText>

                    <View style={styles.timeContainer}>
                        <MaterialIcons name="schedule" size={14} color={colors.textMuted} />
                        <AppText variant="xs" color={colors.textMuted} style={{ marginLeft: 4 }}>
                            {startTime}
                        </AppText>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 256, // h-64 equivalent roughly
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    topActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    titleContainer: {
        zIndex: 10,
    },
    liveBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 4,
        // Optional: glow effect could be added here if needed via shadows
    },
    title: {
        lineHeight: 32,
        marginBottom: 4,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
