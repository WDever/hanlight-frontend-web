interface HeightMedia {
  custom: (maxHeight: number) => string;
  desktop: string;
  desktopWBar: string;
  laptopL: string;
  laptopWBarL: string;
  laptopM: string;
  laptopWBarM: string;
}

const customHeightMediaQuery: (maxHeight: number) => string = (
  maxHeight: number,
): string => `@media (max-height: ${maxHeight}px)`;

export const heightMedia: HeightMedia = {
  custom: customHeightMediaQuery,
  desktop: customHeightMediaQuery(1001),
  desktopWBar: customHeightMediaQuery(969),
  laptopL: customHeightMediaQuery(789),
  laptopWBarL: customHeightMediaQuery(821),
  laptopM: customHeightMediaQuery(789),
  laptopWBarM: customHeightMediaQuery(821),
};
