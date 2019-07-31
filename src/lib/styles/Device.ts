const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tabletS: '768px',
  tabletL: '1024px',
  laptopS: '1440px',
  laptopL: '1600px',
  desktop: '1920px',
  desktopL: '2560px',
};

export const Device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};
