import styled from 'styled-components';
import { Device } from './Device';

export const WrongLabel = styled.span`
  width: 28.75rem;
  color: #ff0000;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;

  @media ${Device.tablet} {
    width: 100%;
  }
  @media ${Device.mobileL} {
    font-size: 0.7rem;
  }
`;
