import * as React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

const TimeBox = styled.div`
  /* display: flex; */
  height: 23.375rem;
  width: 40rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 3rem;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
`;

const TimeWrapper = styled.div`
  vertical-align: bottom;
  display: inline-flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
  width: 100%;
  height: 5.5rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 4.625rem;
  color: #4470ff;
`;

const InnerWrapper = styled.div`
  display: table;
  vertical-align: bottom;
`;

const Unit = styled.span`
  font-family: 'yg-jalnan';
  font-size: 2.3rem;
  font-weight: normal;
  color: black;
`;

const EndTimeComponent: React.FC = () => {
  return (
    <TimeBox>
      <TitleWrapper>
        종례시간까지 남은시간
      </TitleWrapper>
      <TimeWrapper>
        {/* <InnerWrapper>
          {hour}<Unit>시</Unit> {min}<Unit>분</Unit> {sec}<Unit>초</Unit>
        </InnerWrapper> */}
        <InnerWrapper>
          04 <Unit> 시&nbsp;</Unit> 16 <Unit> 분&nbsp;</Unit> 53 <Unit> 초</Unit>
        </InnerWrapper>
      </TimeWrapper>
    </TimeBox>
  );
};

export default EndTimeComponent;
