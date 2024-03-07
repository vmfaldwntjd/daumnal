/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      bg_main: '#EBE3D5',
      bg_modal: 'F8F6EE',
      bg_button: 'FFF1DD',
      bg_nav: 'F3EEEA',
      font_main: '#696864',
      emo_happy: 'FEFFB6',
      emo_sad: '72AFFF',
      emo_angry: 'FF7B76',
      emo_scary: 'FF7B76',
      emo_hate: '00AF7E',
      emo_surprise: 'CC9CFF',
      emo_middle: 'ADADAD',
    }
  },
};
export const plugins = [];

