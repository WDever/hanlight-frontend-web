import { DefaultTheme } from 'styled-components';

export const LightTheme: DefaultTheme = {
  common: {
    mainBg: '#f8f8f8',
    detailBg: '#fff',
    header: '#fff',
  },
  mainCard: {
    bg: '#fff',
    cardShadow: '0 6px 30px 0 #ededed',
    defaultFont: '#222',
    notice: {
      item: '#fff',
      excerptFont: '#b6b8cc',
    },
    timetable: {
      inactiveItem: '#f2f2f2',
      inactiveItemFont: '#aaa',
      activeItem: 'linear-gradient(137deg, #4658f2 0%, #8a3bf0 97%)',
      activeItemFont: '#fff',
      activeItemShadow: '0 10px 30px 0 rgba(115, 69, 241, 0.24)',
      swtichItem: '#2c3cff',
      switchFont: '#fff',
    },
    music: {
      item: '#fff',
      itemDefaultFont: '#222',
      itmeSubFont: '#888',
    },
  },
  detail: {
    defaultFont: '#222',
    meal: {
      inActiveItem: '#f5f5f5',
      activeItem: 'linear-gradient(140deg, #4658f2 3%, #8b3bf0 103%);',
      activeFont: '#fff',
      activeItemShadow: '0 20px 30px 0 #dee1ff;',
    },
  },
};

export const DarkTheme: DefaultTheme = {
  common: {
    mainBg: '',
    detailBg: '',
    header: '',
  },
  mainCard: {
    bg: '',
    cardShadow: '',
    defaultFont: '',
    notice: {
      item: '',
      excerptFont: '',
    },
    timetable: {
      inactiveItem: '',
      inactiveItemFont: '',
      activeItem: '',
      activeItemFont: '',
      activeItemShadow: '',
      swtichItem: '',
      switchFont: '',
    },
    music: {
      item: '',
      itemDefaultFont: '',
      itmeSubFont: '',
    },
  },
  detail: {
    defaultFont: '',
    meal: {
      inActiveItem: '',
      activeItem: '',
      activeFont: '',
      activeItemShadow: '',
    },
  },
};
