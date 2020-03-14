import 'styled-components';

declare module '*.scss';
declare module '*.module.scss';
declare module '*.svg';
declare module '*.png';
declare module 'react-facebook-account-kit';

interface Colors {
  common: {
    bgColor: string;
    headerColor: string;
  };
  mainCard: {
    bgColor: string;
    cardShadow: string;
    defaultFontColor: string;
    notice: {
      itemColor: string;
      excerptFontColor: string;
    };
    timetable: {
      inactiveItemColor: string;
      inactiveItemFontColor: string;
      activeItemColor: string;
      activeItemFontColor: string;
      activeItemShadow: string;
    };
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Colors {}
}
