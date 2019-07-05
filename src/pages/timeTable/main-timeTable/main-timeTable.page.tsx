import * as React from 'react';

import TimeTableContainer from 'container/timeTable/main-timeTable';
import { Device } from 'lib/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const today = moment().get('d');

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17.375rem;
  margin-bottom: 7.4rem;

  @media ${Device.laptop} {
    height: 13.625rem;
    margin-bottom: 5.1rem;
  }
  @media ${Device.mobileL} {
    height: 9.625rem;
    margin-bottom: 3.7rem;
  }
`;

const TitleWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  margin-bottom: 2rem;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  display: flex;
  justify-content: space-between;

  @media ${Device.laptop} {
    margin-bottom: 1.4rem;
  }
  @media ${Device.tablet} {
    font-size: 1.31rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

const TitleDay = styled.span`
  color: #4470ff;

  @media ${Device.tablet} {
    display: none;
  }
`;

const AllViewBtn = styled(Link)`
  display: none;

  @media ${Device.tablet} {
    display: unset;
    color: #6787ec;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: 'Spoqa Han Sans';
    margin-right: 1.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const ListWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${Device.laptop} {
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;

    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;

    -webkit-overflow-scrolling: touch;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-overflow-scrolling {
    display: none;
  }
`;

const MainTimeTablePage: React.FC = () => {
  return (
    <Template>
      <TitleWrapper>
        <div>
          <TitleDay>{days[today]}요일 &nbsp;</TitleDay>
          <span>시간표</span>
        </div>
        <AllViewBtn to="/timetable">전체보기</AllViewBtn>
      </TitleWrapper>

      <ListWrapper>
        <TimeTableContainer />
      </ListWrapper>
    </Template>
  );
};

export default MainTimeTablePage;
