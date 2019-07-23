import * as React from 'react';

import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 4rem;

  background-color: #ffffff;

  display: flex;
  justify-content: center;
`;

const NameBox = styled.div`
  width: 88.4%;
  height: 100%;
  border: solid 1px #e8e8e8;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Open Sans';
  font-size: 19px;
  font-weight: bold;
`;

const LightBox = styled.div`
  width: 16.6%;
  height: 100%;

  border: solid 1px #e8e8e8;

  display: flex;

  justify-content: center;
  align-items: center;

  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #30f97b;
  }
`;

const HTMentorListItemComponent: React.FC = () => {
  return (
    <Content>
      <NameBox>멘토</NameBox>
      <LightBox>
        <div />
      </LightBox>
    </Content>
  );
};

export default HTMentorListItemComponent;
