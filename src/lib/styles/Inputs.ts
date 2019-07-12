import styled from 'styled-components';
import { Device } from './Device';

export const Input = styled.input<{ wrong?: boolean }>`
  width: 33.75rem;
  max-width: 33.75rem;
  height: 4.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-size: 1.25rem;
  font-family: 'Spoqa Han Sans';
  color: #000000;
  border: solid 1px ${({ wrong }) => (wrong ? '#ff0000' : '#707070')};
  border-radius: 0.5rem;

  &::placeholder {
    color: #6d6d6d;
  }
  &:focus {
    border: solid 1px ${({ wrong }) => (wrong ? '#ff0000' : '#4470ff')};
  }

  @media ${Device.tabletS} {
    width: calc(100% - 2.5rem);
  }
  @media ${Device.mobileL} {
    height: 2.5rem;
    font-size: 0.75rem;
    border: solid 1px ${({ wrong }) => (wrong ? '#ff0000' : '#a1a1a1')};
  }
`;

export const InputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media ${Device.tabletL} {
    width: 100%;
  }
`;
