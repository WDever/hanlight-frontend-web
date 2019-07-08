import styled from 'styled-components';
import { Device } from './Device';

export const Button = styled.button<{ active: boolean }>`
  width: 36.25rem;
  max-width: 36.25rem;
  height: 5.625rem;
  background-color: ${({ active }) => (active ? '#4470ff' : '#a3a3a3')};
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.5rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.tabletS} {
    width: 100%;
  }
  @media ${Device.mobileL} {
    height: 3.25rem;
    font-size: 0.875rem;
  }
`;
