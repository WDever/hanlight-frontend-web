import * as React from 'react';
import styled from 'styled-components';
import MainContainer from 'container/main';
import FooterComponent from 'components/footer';
import HeaderContainer from 'container/header';

const MainPage: React.FC = () => {
  return (
    <>
      <HeaderContainer />
      <MainContainer />
      <FooterComponent />
    </>
  );
};

export default MainPage;
