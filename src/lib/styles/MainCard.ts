import styled from 'styled-components';

/* eslint-disable @typescript-eslint/typedef */

export const MainCardWrapper = styled.section`
  max-width: 43.75rem;
  width: calc(43.75rem - 2.25rem * 2);
  height: calc(26.25rem - 1.75rem);

  display: flex;
  flex-direction: column;

  padding: 1.75rem 2.25rem;
  padding-bottom: 0;

  background-color: ${({ theme }): string => theme.mainCard.bgColor};

  border-radius: 0.75rem;

  box-shadow: ${({ theme }): string => theme.mainCard.cardShadow};

  .title {
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    color: ${({ theme }): string => theme.mainCard.defaultFontColor};

    margin: 0;
  }
`;

/* eslint-enable @typescript-eslint/typedef */
