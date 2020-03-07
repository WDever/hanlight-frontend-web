import styled, { StyledComponent } from 'styled-components';

export const MainComponentWrapper: StyledComponent<
  'section',
  any,
  {},
  never
> = styled.section`
  max-width: 43.75rem;
  width: 43.75rem;
  height: 26.25rem;

  display: flex;
  flex-direction: column;

  padding: 1.75rem 2.25rem;
  padding-bottom: 0;

  background-color: #fff;

  border-radius: 0.75rem;

  box-shadow: 0 6px 30px 0 #ededed;

  h1 {
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    color: #222;
  }
`;
