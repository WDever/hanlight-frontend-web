import { DefaultTheme } from 'styled-components';

export const LightTheme: DefaultTheme = {
  common: {
    bgColor: '#f8f8f8',
    headerColor: '#fff',
  },
  mainCard: {
    bgColor: '#fff',
    cardShadow: '0 6px 30px 0 #ededed',
    defaultFontColor: '#222',
    notice: {
      itemColor: '#fff',
      excerptFontColor: '#b6b8cc',
    },
  },
};

export const DarkTheme: DefaultTheme = {
  common: {
    bgColor: '',
    headerColor: '',
  },
  mainCard: {
    bgColor: '',
    cardShadow: '',
    defaultFontColor: '',
    notice: {
      itemColor: '',
      excerptFontColor: '',
    },
  },
};
