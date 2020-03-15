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
    timetable: {
      inactiveItemColor: '#f2f2f2',
      inactiveItemFontColor: '#aaa',
      activeItemColor: 'linear-gradient(137deg, #4658f2 0%, #8a3bf0 97%)',
      activeItemFontColor: '#fff',
      activeItemShadow: '0 10px 30px 0 rgba(115, 69, 241, 0.24)',
      swtichItemColor: '#2c3cff',
      switchFontColor: '#fff',
    },
    music: {
      item: '#fff',
      itemDefaultFont: '#222',
      itmeSubFont: '#888',
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
    timetable: {
      inactiveItemColor: '',
      inactiveItemFontColor: '',
      activeItemColor: '',
      activeItemFontColor: '',
      activeItemShadow: '',
      swtichItemColor: '',
      switchFontColor: '',
    },
    music: {
      item: '',
      itemDefaultFont: '',
      itmeSubFont: '',
    },
  },
};
