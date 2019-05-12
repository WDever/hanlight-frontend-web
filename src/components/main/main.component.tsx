import * as React from 'react';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';
import TimeComponent from './time';

const MainComponent: React.FC = () => {
  return (
    <>
      <NoticePage />
      <TimeComponent />
    </>
  );
};

export default MainComponent;
