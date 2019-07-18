import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% - 4rem);
  padding: 2rem;
  font-family: 'Open Sans';

  border-radius: 0.5rem;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;

  @media ${Device.tabletS} {
    width: calc(100% - 1.7rem);
    padding: 0.85rem;
  }
`;

const Match = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  margin-right: 1rem;
`;

const Position = styled.span`
  font-size: 0.875rem;
  color: #b8b8b8;
`;

const Introduction = styled.span`
  font-size: 0.875rem;
  line-height: 1.79;
  word-break: break-word;
  color: #000000;
`;

const MatchItemComponent: React.FC<{
  name: string;
  studentId: string;
  position: string;
  introduction: string;
}> = ({ name, studentId, position, introduction }) => {
  return (
    <Wrapper>
      <Match>
        <TitleWrapper>
          <Name>
            {name} - {studentId}
          </Name>
          <Position>{position}</Position>
        </TitleWrapper>
        <Introduction>{introduction}</Introduction>
      </Match>
    </Wrapper>
  );
};

export default MatchItemComponent;
