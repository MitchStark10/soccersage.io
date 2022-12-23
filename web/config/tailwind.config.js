const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                primary: '#476194',
                secondary: '#6495ED',
                tertiary: '#6D4794',
                white: '#FFFFFF',
                gray: '#D3D3D3',
                'background-gray': '#F5F5F5',
                'light-gray': '#F9FAFB',
                black: '#000000',
                'error-red': '#E02424',
                'success-green': '#4BB543',
            },
        },
    },
    plugins: [],
};
