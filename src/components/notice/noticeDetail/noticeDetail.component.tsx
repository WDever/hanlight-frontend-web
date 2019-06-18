import * as React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.p``;

const Notice = styled.div`
  width: 90%;
`;

export default class NoticeDetailComponent extends React.Component {
  public render() {
    return (
      <Wrapper>
        <Title>공지사항</Title>
        <Notice />
      </Wrapper>
    );
  }
}
