import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                bounceLow: {
                    '0%, 100%': { transform: 'translateY(-5px)' },
                    '50%': { transform: 'translateY(0)' },
                },
            },
            animation: {
                bounceLow: 'bounceLow 1s infinite',
            },
        },
    },
    daisyui: {
        themes: ['aqua'],
    },
    plugins: [daisyui],
}
