import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { AppText } from '../../../components/shared/AppText';
import { AppButton } from '../../../components/shared/AppButton';
import { AppBadge } from '../../../components/shared/AppBadge';
import { shadows } from '../../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const DATA = [
    {
        id: '1',
        title: 'EARN $20 BETTING ON WORLDS',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-6FJm7tTY99Z92aaYVDeIavMIrm9QRpEpJYDU9-EJwcQsvGV4HLK88MNFVKIuVC5dngyMHZp99xhSk3XNv1yz5yj_ukwbbFGbNF7BZsff9Wk4Ui8qPSZN65kcaKJOI62wIylSNQmghcCyBmj8EOfnUQ9hI9NAyAMOD2bTe3B0bOJEEs-VxRiuzugH_v_ynRxJ9R1jTYpmwqpuuaJfacbpobKFSZlb2m05z29lz3O7XHItqCk29ba7p-jFU8ayaKw4V_p4nBv0-A',
        badge: 'LIVE NOW',
        badgeVariant: 'error',
        buttonText: 'Join Now',
    },
    {
        id: '2',
        title: 'CLASH SQUAD RANKED',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC34L1JQ5UtsdlknyaBLTQl-o_gwnzyJP6mhMHE6aaS25B9RKTR3_-Ltg3F6UuVfPKHLJzJMMqn9Q_mwfxEtOTSTptaAfiXnVtom5fe55OluG_bhnM0r-CKd8OYNzl5TtqBLjTR_ZpuyDCq23bQ3AYhUiIh9Q9MjSvlbO9hBB5IAo4L7jMTstRkQ4wTv2Z1WO5gUlFslSCePFsb2EuIjeNIOJsohAAZ2rOGVB1y1u_5gZkoXgVCqPJdODjn3JkYSO2UKQOicJuTaQ',
        badge: 'NEW SEASON',
        badgeVariant: 'info',
        buttonText: 'Play Now',
    },
];

export const HeroCarousel = () => {
    const { colors, spacing, radius } = useTheme();

    const renderItem = ({ item }: { item: typeof DATA[0] }) => (
        <View style={[styles.cardContainer, { width: CARD_WIDTH, marginLeft: spacing.lg }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <AppBadge
                        label={item.badge}
                        variant={item.badgeVariant as any}
                        style={{ marginBottom: spacing.sm }}
                    />
                    <AppText variant="xxl" fontWeight="bold" color="#FFFFFF" style={{ lineHeight: 32 }}>
                        {item.title}
                    </AppText>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: item.badgeVariant === 'error' ? colors.primary : '#FFFFFF',
                            }
                        ]}
                    >
                        <AppText
                            variant="sm"
                            fontWeight="bold"
                            color={item.badgeVariant === 'error' ? '#FFFFFF' : colors.secondary}
                        >
                            {item.buttonText}
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const styles = StyleSheet.create({
        cardContainer: {
            height: 192,
            borderRadius: radius.lg,
            overflow: 'hidden',
            backgroundColor: colors.surface,
            ...shadows.dark.card, // Ensure shadow visibility
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)', // Darken overlay
            justifyContent: 'center',
            paddingHorizontal: spacing.lg,
        },
        content: {
            width: '70%',
        },
        button: {
            marginTop: spacing.md,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            borderRadius: 999,
            alignSelf: 'flex-start',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }
    });

    return (
        <View style={{ marginTop: spacing.md }}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + spacing.lg}
                decelerationRate="fast"
                contentContainerStyle={{ paddingRight: spacing.lg }}
            />
            {/* Pagination dots could go here */}
        </View>
    );
};
