import styled from 'styled-components';

interface InputsSize {
  width: string | number;
  height: string | number;
  active?: boolean
}

export const Inputs = styled.input<InputsSize>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 16px;
  border: ${props => (props.active ? 'solid 1px #bebebe' : 'solid 1px #4470ff')};
  /* border: solid 1px #bebebe; */
  background-color: #ffffff;
  font-size: 1.25rem;
  text-indent: 1rem;
  color: #4470ff;
  font-family: 'Noto Sans', 'Noto Sans KR';
  outline: none;

  &::placeholder {
    color: #bebebe;
    font-weight: 500;
  }
`;

export const InputsGroup = styled.div<InputsSize>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
