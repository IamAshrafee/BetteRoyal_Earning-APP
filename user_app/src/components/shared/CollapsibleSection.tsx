import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

interface CollapsibleSectionProps {
    title: string;
    iconName: string;
    iconColor: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    iconName,
    iconColor,
    children,
    initiallyExpanded = false
}) => {
    const { colors, spacing, radius, shadows } = useTheme();
    const [expanded, setExpanded] = useState(initiallyExpanded);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.lg,
                ...shadows.soft
            }
        ]}>
            <TouchableOpacity
                style={[styles.header, { padding: spacing.md }]}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <View style={styles.titleContainer}>
                    <MaterialIcons name={iconName} size={20} color={iconColor} />
                    <AppText variant="md" fontWeight="medium" style={{ marginLeft: spacing.sm }}>
                        {title}
                    </AppText>
                </View>
                <MaterialIcons
                    name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color={colors.textMuted}
                />
            </TouchableOpacity>

            {expanded && (
                <View style={[
                    styles.content,
                    {
                        padding: spacing.md,
                        paddingTop: spacing.xs,
                        borderTopWidth: 1,
                        borderTopColor: colors.border + '50' // Light border 
                    }
                ]}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginBottom: 12, // match spacing.md roughly
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        // padding handled inline for theme access
    }
});
