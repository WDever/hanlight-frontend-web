import styled from 'styled-components';

/* eslint-disable @typescript-eslint/typedef */

export const MainCardWrapper = styled.section`
  max-width: 43.75rem;
  width: 43.75rem;
  height: 24rem;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  padding: 1.5rem 2.25rem;
  padding-bottom: 0;

  background-color: ${({ theme }): string => theme.mainCard.bg};

  border-radius: 0.75rem;

  box-shadow: ${({ theme }): string => theme.mainCard.cardShadow};

  .title {
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    color: ${({ theme }): string => theme.mainCard.defaultFont};

    margin: 0;
    margin-bottom: 1rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */
