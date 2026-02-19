import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppBox } from '../../../components/shared/AppBox';
import { AppText } from '../../../components/shared/AppText';
import { AppButton } from '../../../components/shared/AppButton';
import { AppInput } from '../../../components/shared/AppInput';

export const RegistrationScreen = () => {
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Username availability state
    const [isCheckingUser, setIsCheckingUser] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

    // Debounce username check
    useEffect(() => {
        if (!username || username.length < 3) {
            setUsernameAvailable(null);
            setIsCheckingUser(false);
            return;
        }

        setIsCheckingUser(true);
        setUsernameAvailable(null);

        const timer = setTimeout(() => {
            // Mock API call simulation
            const isAvailable = Math.random() > 0.3; // 70% chance available
            setUsernameAvailable(isAvailable);
            setIsCheckingUser(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [username]);

    const handleRegister = () => {
        if (!usernameAvailable) {
            Alert.alert('Error', 'Please choose a valid available username');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        console.log('Registering', { username, email, password });
        Alert.alert('Success', 'Account created successfully!');
        navigation.goBack();
    };

    const getUsernameIcon = () => {
        if (isCheckingUser) return 'hourglass-empty';
        if (usernameAvailable === true) return 'check-circle';
        if (usernameAvailable === false) return 'cancel';
        return undefined;
    };

    const getUsernameColor = () => {
        if (isCheckingUser) return colors.textMuted;
        if (usernameAvailable === true) return '#10B981'; // Success Green
        if (usernameAvailable === false) return colors.error;
        return colors.textMuted;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar
                barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            {/* Header */}
            <View style={[styles.header, { marginTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <AppText variant="lg" fontWeight="semiBold">Create Account</AppText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <AppBox center margin={24}>
                    <AppBox
                        backgroundColor={colors.primary + '20'}
                        padding={16}
                        borderRadius={16}
                        margin={24}
                        center
                        style={{ width: 64, height: 64 }}
                    >
                        <Icon name="person-add" size={32} color={colors.primary} />
                    </AppBox>
                    <AppText variant="xxl" fontWeight="bold" align="center" style={{ marginBottom: 8 }}>
                        Join the Action
                    </AppText>
                    <AppText variant="md" color={colors.textMuted} align="center">
                        Create your profile to start competing.
                    </AppText>
                </AppBox>

                <View style={styles.form}>
                    <AppBox margin={20} style={{ marginBottom: 0 }}>

                        {/* Username Field */}
                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={styles.label}>
                            Username
                        </AppText>
                        <View style={styles.inputWrapper}>
                            <AppInput
                                placeholder="Choose a unique username"
                                value={username}
                                onChangeText={setUsername}
                                leftIcon="alternate-email"
                                rightIcon={getUsernameIcon()}
                                autoCapitalize="none"
                                error={usernameAvailable === false ? 'Username is taken' : undefined}
                            />
                            {/* Custom coloring for status icon since AppInput doesn't support custom props for it yet */}
                            {/* We are relying on the error prop to color the border, handling icon color might require component update or ignoring for now */}
                        </View>
                        {usernameAvailable === true && (
                            <AppText variant="xs" color="#10B981" style={styles.helperText}>
                                Username is available!
                            </AppText>
                        )}


                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={styles.label}>
                            Email Address
                        </AppText>
                        <AppInput
                            placeholder="name@example.com"
                            value={email}
                            onChangeText={setEmail}
                            leftIcon="mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={styles.label}>
                            Password
                        </AppText>
                        <AppInput
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            leftIcon="lock"
                            rightIcon={showPassword ? 'visibility' : 'visibility-off'}
                            onRightIconPress={() => setShowPassword(!showPassword)}
                        />

                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={styles.label}>
                            Confirm Password
                        </AppText>
                        <AppInput
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                            leftIcon="lock-outline"
                        />

                        <AppButton
                            title="Create Account"
                            onPress={handleRegister}
                            icon="arrow-forward"
                            iconRight
                            style={styles.registerButton}
                            disabled={!username || !email || !password || !confirmPassword || usernameAvailable === false || isCheckingUser}
                        />

                    </AppBox>
                </View>

                <View style={styles.footer}>
                    <AppText color={colors.textMuted}>Already have an account? </AppText>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AppText color={colors.primary} fontWeight="semiBold">Login</AppText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 32,
    },
    form: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
    },
    label: {
        marginBottom: 6,
        marginLeft: 4
    },
    inputWrapper: {
        marginBottom: 4
    },
    helperText: {
        marginLeft: 4,
        marginTop: -12,
        marginBottom: 16
    },
    registerButton: {
        marginTop: 24,
        marginBottom: 24,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 24
    },
});
