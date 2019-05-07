import styled from 'styled-components';

interface ButtonsProps {
  width: string | number;
  height: string | number;
  active: boolean
}

export const Buttons = styled.button<ButtonsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 16px;
  border: ${props => props.active && 'solid 1px #4470ff'};
  background-color: ${props => (props.active ? '#4470ff' : '#a2a2a2')};
  box-shadow: 0 3px 10px 0 rgba(68, 112, 255, 0.24);
  font-size: 1.25rem;
  font-weight: 900;
  color: white;
  font-family: 'Noto Sans', 'Noto Sans KR';
  outline: none;
`;
