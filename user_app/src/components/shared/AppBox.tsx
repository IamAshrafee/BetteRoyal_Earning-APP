import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface AppBoxProps extends ViewProps {
    backgroundColor?: string;
    padding?: number;
    margin?: number;
    borderRadius?: number;
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
    const { colors } = useTheme();

    const containerStyle: ViewStyle = {
        backgroundColor: backgroundColor || 'transparent',
        padding: padding,
        margin: margin,
        borderRadius: borderRadius,
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
