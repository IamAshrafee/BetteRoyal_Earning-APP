import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import Icon from 'react-native-vector-icons/FontAwesome5';

const GAME_MODES = [
    {
        id: '1',
        title: 'Classic',
        subtitle: 'Full Map',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeM8TYyKtF3LtN96jso0cKiyfXxqmqeOAw2VMPgPwUS3ZsJY8QzT2HKGZzQNeB3En7lvayt4wLV_CJ9gZW-sfYyvWxzMCoGb_QuhPK11BPFjz_WiLzUEscpOG9nLue5jN38utiGj2tVZ34jybVAF3tZo2zo197zfTfa_9ng07zOiUxaRomjW-gUITZnIftEORLF3KNjYuOKrAFrFD4N4gwoOya-XgSlZNSTFCYhVwN3OEyDTa6avQdEERh2PPSae8LJc-aSyYZQw',
        icon: 'map',
    },
    {
        id: '2',
        title: 'Clash Squad',
        subtitle: '4v4 Ranked',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX1T1oVI-7spZILD6XZ5ImzDNHFzhCpbF31dKNVeEvplgQP3YsB9buuMouBpIjhlgBy8a0bXAIe8SJqEMV5MCKBm8UNhyZMQZXb1ssl4fm19jj2cK1tKh3AvhPSRDdRk0P68_9AGeQp5WNbtMAvwiFe-GglTdp4h3a7rfEaCm_p_61XnZKzTurc-gJ5DlIruf0UYgm9fw_aPJJn9rHx89rXdppTS3LzI1Vz0u1QfFo5eU27trXUTUPZCbk-ipKqJQdwLs1PKYr6Q',
        icon: 'users',
    },
    {
        id: '3',
        title: 'Lone Wolf',
        subtitle: '1v1 Duel',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwT9v0ILSvxOC7j54XIzQyJ4hs6Vv03w6xlmL_jYuaXnEZUv1snA_8Ne0xQ2OTM1VvG9BfT6CvDH-CxJwx8PYHEGv8k0pH6pBAN9uoHjO9h_MHs3UzHu_UuVgqgX4VfK-Y_EWwJVC65TQ8XABn9asemiqhh_5iqW3hacB4Sk8t2nYat5FHDHC29e7ATBvLceJkYEBOTWQDZ7HNjcI1ReDj_8fpBD0zqgQ6gL8fddSFa6efdwyX6RH9kEGtomTir6R8Ox5MhUXXBQ',
        icon: 'skull',
    },
    {
        id: '4',
        title: 'TDM',
        subtitle: 'Fast Paced',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtajKv_IAa_I6hoWQNYod6lEQl5ylk3UbpAXpdo_y4lBPvTEjBIiDq3ruyKulmP_ReuIw8bphJ1ivL1D8oR6bSyMfVSTZG_X_q7uC02HbLhVUzppPwuBxXayrYPdF05kmUc_pc-3kLTYG92T6PAqVBOlruTf-5uPMN3OH135r3YR3FsBIV3QVV_OY4BioOGGwreCTXLBwfP-9V7LvAq4pefkSudQtcpZ78y9f001OengvpM2PiuuudfZfHetLEpZbeZOF6h0FF5Q',
        icon: 'stopwatch',
    },
];

const { width } = Dimensions.get('window');
const COLUMN_GAP = 16;
const CONTAINER_PADDING = 24; // spacing.lg
const ITEM_WIDTH = (width - (CONTAINER_PADDING * 2) - COLUMN_GAP) / 2;

export const GameModeGrid = () => {
    const { colors, spacing, radius } = useTheme();

    return (
        <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.lg }}>
            <AppText variant="lg" fontWeight="bold" style={{ marginBottom: spacing.md }}>
                Game Modes
            </AppText>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: COLUMN_GAP }}>
                {GAME_MODES.map((mode) => (
                    <TouchableOpacity
                        key={mode.id}
                        style={{
                            width: ITEM_WIDTH,
                            height: 160,
                            borderRadius: radius.md,
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: colors.surface,
                        }}
                    >
                        <Image
                            source={{ uri: mode.image }}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                        <View style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'rgba(0,0,0,0.3)', // Less opaque for better visibility
                            padding: spacing.md,
                            justifyContent: 'flex-end'
                        }}>
                            <View style={{
                                position: 'absolute',
                                top: spacing.sm,
                                right: spacing.sm,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                padding: 6,
                                borderRadius: radius.sm
                            }}>
                                <Icon name={mode.icon} size={12} color="#FFFFFF" />
                            </View>

                            <AppText variant="xs" color="#E0E0E0">{mode.subtitle}</AppText>
                            <AppText variant="md" fontWeight="bold" color="#FFFFFF" style={{ lineHeight: 20 }}>
                                {mode.title}
                            </AppText>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
