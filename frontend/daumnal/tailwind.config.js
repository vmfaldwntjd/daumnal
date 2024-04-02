/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      bg_main: '#EBE3D5',
      bg_modal: '#F8F6EE',
      bg_button: '#FFF1DD',
      bg_nav: '#F3EEEA',
      bg_hashtag: '#DFD3C3',
      bg_line: 'rgba(105, 104, 100, 0.3)',
      font_main: '#696864',
      emo_happy: '#FEFFB6',
      emo_sad: '#72AFFF',
      emo_angry: '#FF7B76',
      emo_scary: '#FF7B76',
      emo_hate: '#00AF7E',
      emo_surprise: '#CC9CFF',
      emo_middle: '#ADADAD',
      button_border: 'rgba(156, 155, 150, 0.5)',
      button_faChevron: '#CCCCCC'
      
    },
    fontFamily:{
      'NanumSquare': ['NanumSquare'],
    },
  },
};
export const plugins = [];

