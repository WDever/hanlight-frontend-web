import * as React from 'react';

import { Device } from 'lib/styles';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 4rem;

  background-color: #ffffff;

  display: flex;
  justify-content: center;

  @media ${Device.mobileL} {
    height: 2.125rem;
  }
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

  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
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

    @media ${Device.mobileL} {
      width: 0.65rem;
      height: 0.65rem;
    }
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
