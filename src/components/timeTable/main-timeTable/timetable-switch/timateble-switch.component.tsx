import React from 'react';

import styled, {
  keyframes,
  css,
  FlattenSimpleInterpolation,
} from 'styled-components';

/* eslint-disable @typescript-eslint/typedef */

const fingerMove = keyframes`
  from {
    left: -3rem;
  }
  
  to {
    left: -2rem;
  }
`;

const SwitchWrapper = styled.form<{ isChanged: boolean; isChecked: boolean }>`
  width: 5.125rem;
  height: 2rem;

  position: relative;

  display: flex;
  align-items: center;

  background-color: ${({ theme }): string =>
    theme.mainCard.timetable.swtichItemColor};

  font-family: 'Noto Sans KR';
  font-size: 15px;
  color: ${({ theme }): string => theme.mainCard.timetable.switchFontColor};

  border-radius: 6.25rem;

  cursor: pointer;

  ${({ isChanged }): FlattenSimpleInterpolation | undefined =>
    isChanged
      ? css`
          ::before {
            content: '👉';

            font-size: 2.25rem;

            position: absolute;
            left: -3rem;

            animation: ${fingerMove} 1s 0.5s infinite linear alternate;
          }
        `
      : undefined}

  div {
    width: 100%;
    ${({ isChecked }): FlattenSimpleInterpolation =>
      isChecked
        ? css`
            padding-right: 2.25rem;
          `
        : css`
            padding-left: 2.25rem;
          `};

    text-align: ${({ isChecked }): string => (isChecked ? 'right' : 'left')};
  }

  input {
    cursor: pointer;

    position: absolute;

    width: 1.25rem;
    height: 1.25rem;

    border: none;
    outline: none;
    margin: 0;

    transform: ${({ isChecked }): string =>
      isChecked ? 'translateX(230%)' : ''};

    transition: all 0.5s;

    margin: 0 0.5rem;

    border-radius: 50%;

    background-color: ${({ theme }): string =>
      theme.mainCard.timetable.switchFontColor};
  }
`;

/* eslint-enable @typescript-eslint/typedef */

interface Props {
  isChanged: boolean;
  isChecked: boolean;
  handleSwitch: () => void;
}

const TimetableSwitchComponent: React.FC<Props> = ({
  isChanged,
  isChecked,
  handleSwitch,
}: Props) => {
  return (
    <SwitchWrapper
      isChanged={isChanged}
      isChecked={isChecked}
      onClick={handleSwitch}
    >
      <input type='checkbox' />
      {isChecked ? <div>ON</div> : <div>OFF</div>}
    </SwitchWrapper>
  );
};

export default TimetableSwitchComponent;
