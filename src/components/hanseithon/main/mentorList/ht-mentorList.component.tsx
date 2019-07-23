import * as React from 'react';

import styled from 'styled-components';
import HTMentorListItemComponent from './mentorListItem';

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 8rem;
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  font-size: 2.25rem;

  margin-bottom: 2.3rem;
`;

const ContentWrapper = styled.div`
  width: 43.125rem;

  font-family: 'Open Sans';

  p {
    margin: 0;

    width: 100%;
    height: 4rem;

    font-weight: bold;
    font-size: 19px;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000;
  }
`;

const HTMentoringListComponent: React.FC = () => {
  return (
    <Wrapper>
      <TitleWrapper>실시간 멘토 현황</TitleWrapper>
      <ContentWrapper>
        <p>실시간 멘토 체크</p>
        <HTMentorListItemComponent />
      </ContentWrapper>
    </Wrapper>
  );
};

export default HTMentoringListComponent;
