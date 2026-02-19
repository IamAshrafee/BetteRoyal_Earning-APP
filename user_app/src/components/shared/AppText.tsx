import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface AppTextProps extends TextProps {
    variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    fontWeight?: 'regular' | 'medium' | 'semiBold' | 'bold';
    color?: string;
    align?: TextStyle['textAlign'];
    style?: TextStyle;
}

export const AppText: React.FC<AppTextProps> = ({
    children,
    variant = 'md',
    fontWeight = 'regular',
    color,
    align,
    style,
    ...props
}) => {
    const { colors, typography } = useTheme();

    const textStyle: TextStyle = {
        fontFamily: typography.fontFamily[fontWeight],
        fontSize: typography.size[variant],
        fontWeight: typography.weight[fontWeight] as TextStyle['fontWeight'],
        color: color || colors.text,
        textAlign: align,
        ...style,
    };

    return (
        <Text style={textStyle} {...props}>
            {children}
        </Text>
    );
};
