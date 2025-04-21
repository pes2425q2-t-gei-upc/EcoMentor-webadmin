import {defaultTheme} from "react-admin";
export const colors = {
    "subtleWhite" : "#F2F6EB",
    "forestGreen" : "#568265",
    "darkGreen" : "#324A3A"
};

const ecomentorTheme = {
    ...defaultTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#568265',
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.darkGreen,
            contrastText: '#ffffff',
        },
        background: {
            default: colors.subtleWhite,
            paper: '#ffffff',
        },
        text: {
            primary: colors.darkGreen,
            secondary: colors.forestGreen,
        },
        error: {
            main: '#ff5252',
        },
    },
    typography: {
        ...defaultTheme.typography,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        ...defaultTheme.components,
    },
};

export default ecomentorTheme;

