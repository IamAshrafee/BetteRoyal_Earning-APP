import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

interface AppBackButtonProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const AppBackButton: React.FC<AppBackButtonProps> = ({ onPress, style }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface }, style]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <MaterialIcons name="arrow-back-ios-new" size={14} color={colors.text} />
            <AppText
                variant="xs"
                fontWeight="bold"
                style={{ marginLeft: 4, textTransform: 'uppercase' }}
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
        paddingHorizontal: 12,
        borderRadius: 999,
    },
});
