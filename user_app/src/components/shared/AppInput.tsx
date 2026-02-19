import React, { useState } from 'react';
import { TextInput, TextInputProps, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppInputProps extends TextInputProps {
    leftIcon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
    error?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
    leftIcon,
    rightIcon,
    onRightIconPress,
    error,
    style,
    onFocus,
    onBlur,
    ...props
}) => {
    const { colors, typography } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus && onFocus(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur && onBlur(e);
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: colors.input,
                        borderColor: error ? colors.error : isFocused ? colors.primary : 'transparent',
                        borderWidth: 1,
                        borderRadius: 12,
                    },
                ]}
            >
                {leftIcon && (
                    <View style={styles.leftIcon}>
                        <Icon
                            name={leftIcon}
                            size={20}
                            color={isFocused ? colors.primary : colors.textMuted}
                        />
                    </View>
                )}
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: colors.text,
                            fontFamily: typography.fontFamily.regular,
                            fontSize: typography.size.md,
                            paddingLeft: leftIcon ? 44 : 16,
                            paddingRight: rightIcon ? 44 : 16,
                        },
                        style,
                    ]}
                    placeholderTextColor={colors.textMuted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                    >
                        <Icon
                            name={rightIcon}
                            size={20}
                            color={colors.textMuted}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        height: 56,
        position: 'relative',
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
    },
    leftIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    rightIcon: {
        position: 'absolute',
        right: 16,
        zIndex: 1,
    },
});
