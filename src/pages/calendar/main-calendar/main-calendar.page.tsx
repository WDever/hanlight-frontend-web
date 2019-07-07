import CalendarContainer from 'container/calendar/main-calendar';
import { Device } from 'lib/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2.75rem;

  @media ${Device.tablet} {
    align-items: flex-start;
  }
`;

const TitleWrapper = styled.div`
  width: 90%;
  max-width: 81rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tablet} {
    margin-bottom: 1.37rem;
    margin-left: 5%;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
  }
`;

const Title = styled.span`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  @media ${Device.tablet} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.125rem;
  }
`;

const AllViewBtn = styled(Link)`
  display: none;

  @media ${Device.tablet} {
    display: unset;
    color: #6787ec;
    text-decoration: none;
    font-size: 1rem;
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

const Wrapper = styled.div`
  width: 90%;
  max-width: 81rem;
  height: 100%;

  @media ${Device.tablet} {
    width: 95%;
    max-width: unset;
    margin-left: 5%;
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    flex: 1;
    display: flex;
    align-items: flex-start;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-overflow-scrolling {
    display: none;
  }
`;

const MainCalendarPage: React.FC = () => (
  <Template>
    <TitleWrapper>
      <Title>학사일정</Title>
      <AllViewBtn to="/calendar">전체보기</AllViewBtn>
    </TitleWrapper>
    <Wrapper>
      <CalendarContainer />
    </Wrapper>
  </Template>
);

export default MainCalendarPage;
