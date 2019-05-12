import * as React from 'react';
import styled from 'styled-components';
import MainContainer from 'container/main';
import FooterComponent from 'components/footer';
import HeaderComponent from 'components/header';

const MainPage: React.FC = () => {
  const name = localStorage.getItem('name');
  return (
    <>
      <HeaderComponent name={name} />
      <MainContainer />
      <FooterComponent />
    </>
  );
};

export default MainPage;
