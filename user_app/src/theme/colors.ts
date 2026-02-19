export const colors = {
    light: {
        primary: '#FF3B30',
        secondary: '#1A1A1A',
        background: '#F8F8F8',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        textMuted: '#8E8E93',
        input: '#FFFFFF',
        border: '#E5E5EA',
        error: '#FF3B30',
        success: '#34C759',
        warning: '#FF9500',
        info: '#00C7BE',
    },
    dark: {
        primary: '#FF3B30',
        secondary: '#FFFFFF',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#FFFFFF',
        textMuted: '#A1A1AA',
        input: '#1E1E1E',
        border: '#2C2C2E',
        error: '#FF4b4b', // Slightly lighter red for dark mode error visibility if needed, but keeping consistent
        success: '#34C759',
        warning: '#FF9500',
        info: '#00C7BE',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const radius = {
    sm: 8,
    md: 12, // Base
    lg: 16,
    full: 9999,
};

export const shadows = {
    light: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
        },
        card: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 1,
        },
        glow: {
            shadowColor: '#FF3B30',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
        }
    },
    dark: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 2,
        }, // Shadows often subtle or removed in dark mode
        card: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        glow: {
            shadowColor: '#FF3B30',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 10,
        }
    },
};
