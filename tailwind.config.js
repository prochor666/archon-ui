module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            zIndex: {
                1000: 1000,
                2000: 2000,
                3000: 3000,
                4000: 4000,
                5000: 5000,
                6000: 6000,
                7000: 7000,
                8000: 8000,
                9000: 9000,
                9999: 9999,
            },

            // custom fonts
            fontFamily: {
                ProximaNovaRegular: ['ProximaNovaRegular', 'sans-serif'],
                ProximaNovaBold: ['ProximaNovaBold', 'sans-serif'],
                ProximaNovaSemibold: ['ProximaNovaSemibold', 'sans-serif'],
                ProximaNovaARegular: ['ProximaNovaARegular', 'sans-serif'],
                ProximaNovaABold: ['v', 'sans-serif'],
                ProximaNovaASemibold: ['ProximaNovaASemibold', 'sans-serif'],
                ProximaNovaSRegular: ['ProximaNovaSRegular', 'sans-serif'],
                ProximaNovaSBold: ['ProximaNovaSBold', 'sans-serif'],
                ProximaNovaSSemibold: ['ProximaNovaSSemibold', 'sans-serif'],
            },

            // animation class
            animation: {
                fadein: 'fadeIn 500ms ease-in',
                fadeout: 'fadeOut 500ms ease-out',
            },

            // actual animation
            keyframes: theme => ({
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '100%': { opacity: '1' },
                    '0%': { opacity: '0' },
                },
            }),
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@vueform/slider/tailwind'),
    ],
};
