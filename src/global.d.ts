import 'styled-components';

declare module '*.scss';
declare module '*.module.scss';
declare module '*.svg';
declare module '*.png';
declare module 'react-facebook-account-kit';

interface Colors {
  common: {
    mainBg: string;
    detailBg: string;
    header: string;
  };
  mainCard: {
    bg: string;
    cardShadow: string;
    defaultFont: string;
    notice: {
      item: string;
      excerptFont: string;
    };
    timetable: {
      inactiveItem: string;
      inactiveItemFont: string;
      activeItem: string;
      activeItemFont: string;
      activeItemShadow: string;
      swtichItem: string;
      switchFont: string;
    };
    music: {
      item: string;
      itemDefaultFont: string;
      itmeSubFont: string;
    };
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Colors {}
}
