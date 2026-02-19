import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppBox } from '../../../components/shared/AppBox';
import { AppText } from '../../../components/shared/AppText';
import { AppButton } from '../../../components/shared/AppButton';
import { AppInput } from '../../../components/shared/AppInput';

export const LoginScreen = () => {
    const { colors, theme, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log('Login pressed', { username, password });
        navigation.navigate('Main' as never);
    };

    const handleSocialLogin = (provider: string) => {
        console.log('Social login', provider);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar
                barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />



            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Toggle Theme Button (Absolute) */}
                <TouchableOpacity
                    style={[styles.themeToggle, { backgroundColor: theme === 'dark' ? colors.surface : colors.input, top: insets.top + 20 }]}
                    onPress={toggleTheme}
                >
                    <Icon
                        name={theme === 'dark' ? 'light-mode' : 'dark-mode'}
                        size={20}
                        color={colors.text}
                    />
                </TouchableOpacity>

                <AppBox center margin={24}>
                    <AppBox
                        backgroundColor={colors.primary + '20'} // 10-20% opacity
                        padding={16}
                        borderRadius={16}
                        margin={24}
                        center
                        style={{ width: 64, height: 64 }}
                    >
                        <Icon name="sports-esports" size={32} color={colors.primary} />
                    </AppBox>
                    <AppText variant="xxxl" fontWeight="bold" align="center" style={{ marginBottom: 8 }}>
                        Welcome Back!
                    </AppText>
                    <AppText variant="md" color={colors.textMuted} align="center">
                        Login to join the battlefield and earn rewards.
                    </AppText>
                </AppBox>

                <View style={styles.form}>
                    <AppBox margin={20} style={{ marginBottom: 0 }}>
                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={{ marginBottom: 6, marginLeft: 4 }}>
                            Username or Email
                        </AppText>
                        <AppInput
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUsername}
                            leftIcon="person"
                        />

                        <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={{ marginBottom: 6, marginLeft: 4 }}>
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

                        <View style={styles.forgotPassword}>
                            <TouchableOpacity>
                                <AppText variant="sm" fontWeight="medium" color={colors.primary}>
                                    Forgot Password?
                                </AppText>
                            </TouchableOpacity>
                        </View>

                        <AppButton
                            title="Login"
                            onPress={handleLogin}
                            icon="arrow-forward"
                            iconRight
                            style={styles.loginButton}
                        />

                        <View style={styles.dividerContainer}>
                            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                            <AppText variant="sm" fontWeight="medium" color={colors.textMuted} style={styles.dividerText}>
                                Or continue with
                            </AppText>
                            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                        </View>

                        <View style={styles.socialContainer}>
                            <AppButton
                                variant="social"
                                onPress={() => handleSocialLogin('Google')}
                                style={styles.socialButton}
                            >
                                {/* Placeholder for Google Icon */}
                                <AppText variant="sm" fontWeight="medium">Google</AppText>
                            </AppButton>

                            <AppButton
                                variant="social"
                                onPress={() => handleSocialLogin('Facebook')}
                                style={styles.socialButton}
                            >
                                {/* Placeholder for Facebook Icon */}
                                <AppText variant="sm" fontWeight="medium">Facebook</AppText>
                            </AppButton>
                        </View>
                    </AppBox>
                </View>

                <View style={styles.footer}>
                    <AppText color={colors.textMuted}>Don't have an account? </AppText>
                    <TouchableOpacity onPress={() => (navigation as any).navigate('Register')}>
                        <AppText color={colors.primary} fontWeight="semiBold">Register Now</AppText>
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
        paddingHorizontal: 24,
        paddingTop: 12, // slightly reduced since it's added to safe area top
        paddingBottom: 12,
    },
    statusIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 6,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 32,
    },
    themeToggle: {
        position: 'absolute',
        top: 20,
        right: 24,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    form: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginTop: -8,
        marginBottom: 24,
    },
    loginButton: {
        marginBottom: 24,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        paddingHorizontal: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    socialButton: {
        flex: 1,
    },
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
});
