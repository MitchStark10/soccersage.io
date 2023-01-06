const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                primary: '#0183BF',
                'primary-light': '#008CCC',
                'primary-dark': '#007FBA',

                secondary: '#618B4A',
                'secondary-dark': '#4A6B38',
                'secondary-light': '#7FAE65',

                tertiary: '#E18335',
                'tertiary-light': '#F2A15F',
                'tertiary-dark': '#AF622C',

                'success-background': '#E6F4EA',
                'success-dark': '#006400',
                success: '#4BB543',

                info: '#008CCC',
                'info-background': '#E6F4F9',
                'info-dark': '#002b63',

                white: '#FFFFFF',
                gray: '#D3D3D3',
                'background-gray': '#F5F5F5',
                'light-gray': '#F9FAFB',
                black: '#000000',
                'error-red': '#E02424',
                'success-green': '#4BB543',
            },
            borderRadius: {
                circle: '100%',
            },
        },
    },
    plugins: [],
};
