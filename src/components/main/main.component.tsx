import * as React from 'react';
import HeaderComponent from 'components/header';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';

const MainComponent: React.FC = () => {
  return (
    <>
      <HeaderComponent name="이민혁" />
      <NoticePage />
    </>
  );
};

export default MainComponent;
