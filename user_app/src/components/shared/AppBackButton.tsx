import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

interface AppBackButtonProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    variant?: 'default' | 'glass';
}

export const AppBackButton: React.FC<AppBackButtonProps> = ({ onPress, style, variant = 'default' }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const isGlass = variant === 'glass';

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.backButton,
                isGlass ? styles.glassButton : { backgroundColor: colors.surface },
                style
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <MaterialIcons
                name="arrow-back-ios-new"
                size={14}
                color={isGlass ? '#FFFFFF' : colors.text}
            />
            <AppText
                variant="xs"
                fontWeight="bold"
                style={{ marginLeft: 4, textTransform: 'uppercase' }}
                color={isGlass ? '#FFFFFF' : colors.text}
            >
                BACK
            </AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16, // using 16 horizontal to match MatchDetail header padding
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'transparent', // default transparent, overridden by glass
    },
    glassButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
    }
});
