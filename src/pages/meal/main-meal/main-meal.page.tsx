import MealContainer from 'container/meal/main-meal';
import { Device } from 'lib/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  margin-bottom: 7.4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${Device.tabletL} {
    margin-bottom: 5rem;
  }
`;

const TitleWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  margin-bottom: 2.5rem;

  display: flex;
  justify-content: space-between;

  @media ${Device.tabletL} {
    margin-bottom: 1.39rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const AllViewBtn = styled(Link)`
  display: none;

  @media ${Device.tabletL} {
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

const ListWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;

  @media ${Device.tabletL} {
    width: 95%;
    max-width: unset;
    margin-left: 5%;
    position: relative;
    flex: 1;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-overflow-scrolling {
    display: none;
  }
`;

const MainMealPage: React.FC = () => {
  return (
    <Template>
      <MealContainer />
    </Template>
  );
};

export default MainMealPage;
