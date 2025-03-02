const {heroui} = require('@heroui/theme');
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
    darkMode: 'selector',
    theme: {
        extend: {
            width: {
                '-350': '350px',
            },
            colors: {
                'primary': '#00A36C',
                'secondary': '#008080',
                'tertiary': '#808000',
                'primaryBGDark': '#121212',
                'primaryBGLight': '#f8fafc',
                'secondaryBGDark': '#1E1E1E',
                'cardBGDark': '#232323',
            },
            fontFamily: {
                '_Lato': ['Lato', 'sans-serif'],
                '_Oswald': ['Oswald', 'sans-serif'],
            },
            screens: {
                'xsm': '425px'
            }
        },
    },

    darkMode: "class",
  plugins: [forms,heroui()],
};
