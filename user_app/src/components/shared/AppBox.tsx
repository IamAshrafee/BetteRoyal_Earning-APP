import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing as spacingTokens, radius as radiusTokens } from '../../theme/colors';

interface AppBoxProps extends ViewProps {
    backgroundColor?: string;
    padding?: number | keyof typeof spacingTokens;
    margin?: number | keyof typeof spacingTokens;
    borderRadius?: number | keyof typeof radiusTokens;
    center?: boolean;
    row?: boolean;
    justify?: ViewStyle['justifyContent'];
    align?: ViewStyle['alignItems'];
    style?: ViewStyle;
}

export const AppBox: React.FC<AppBoxProps> = ({
    children,
    backgroundColor,
    padding,
    margin,
    borderRadius,
    center,
    row,
    justify,
    align,
    style,
    ...props
}) => {
    const { spacing, radius } = useTheme();

    const getValue = (val: number | string | undefined, tokens: Record<string, number>) => {
        if (typeof val === 'string' && val in tokens) {
            return tokens[val as keyof typeof tokens];
        }
        return val as number;
    };

    const containerStyle: ViewStyle = {
        backgroundColor: backgroundColor || 'transparent',
        padding: getValue(padding, spacing),
        margin: getValue(margin, spacing),
        borderRadius: getValue(borderRadius, radius),
        flexDirection: row ? 'row' : 'column',
        justifyContent: center ? 'center' : justify,
        alignItems: center ? 'center' : align,
        ...style,
    };

    return (
        <View style={containerStyle} {...props}>
            {children}
        </View>
    );
};
