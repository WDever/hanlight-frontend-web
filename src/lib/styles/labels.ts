import styled from 'styled-components';
import { Device } from './Device';

export const WrongMessageWrapper = styled.div`
  width: 100%;
  height: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #ff0000;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;

  @media ${Device.tabletS} {
    width: calc(100% - 2.5rem);
    max-width: 36.25rem;
  }
  @media ${Device.mobileL} {
    height: 0.93rem;
    font-size: 0.625rem;
    margin-top: 0.25rem;
    margin-bottom: 0.75rem;
  }
`;
