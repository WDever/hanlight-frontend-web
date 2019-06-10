import styled from 'styled-components';

interface InputsSize {
  width: string | number;
  height: string | number;
  active?: boolean;
}

export const Inputs = styled.input<InputsSize & { wrong?: boolean }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 16px;
  border: ${props => {
    if (props.active) {
      if (props.active && props.wrong) {
        return 'solid 1px #ff0000';
      }
      return 'solid 1px #4470ff';
    }
    return 'solid 1px #bebebe';
  }};
  /* border: solid 1px #bebebe; */
  background-color: #ffffff;
  font-size: 1.25rem;
  text-indent: 1rem;
  color: #4470ff;
  font-family: 'Spoqa Han Sans';
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
  justify-content: flex-end;
`;
