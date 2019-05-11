import * as React from 'react';
import HeaderComponent from 'components/header';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';

const MainComponent: React.FC = () => {
  const name = localStorage.getItem('name');
  return (
    <>
      <HeaderComponent name={name} />
      <NoticePage />
    </>
  );
};

export default MainComponent;
