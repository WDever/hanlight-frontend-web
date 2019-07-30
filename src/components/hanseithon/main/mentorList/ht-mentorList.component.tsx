import * as React from 'react';

import { Device } from 'lib/styles';
import BackgroundImg from 'lib/svg/mentoring-background.svg';
import { HtUserType, MentorRequestType, MentorType, ModalTypes } from 'store';
import styled from 'styled-components';
import HTMentorListItemComponent, {
  MentorListItemProps,
} from './mentorListItem';

const { useEffect } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 8rem;

  @media ${Device.mobileL} {
    margin-bottom: 1.55rem;
  }
`;

const Background = styled.img`
  position: absolute;
  z-index: -1;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  font-size: 2.25rem;

  margin-bottom: 2.3rem;

  @media ${Device.mobileL} {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const ContentWrapper = styled.div`
  width: 43.125rem;
  min-height: 16rem;

  background-color: #ffffff;

  border: solid 1px #e8e8e8;

  font-family: 'Open Sans';

  @media ${Device.mobileL} {
    width: 100%;
    min-height: 8.5rem;
  }

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

    @media ${Device.mobileL} {
      height: 2.125rem;

      font-size: 13px;
    }
  }
`;

interface MentorListProps {
  mentorList: MentorType[];
  errMessage: string;
  accessToken: string;
  htUserType: HtUserType;

  getMentorStatus: 'none' | 'pending' | 'success' | 'failure';

  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
  getMentor(payload: string): void;
  setMentorPk(payload: number): void;
}

const HTMentoringListComponent: React.FC<MentorListProps> = ({
  modal,
  deem,
  mentorList,
  getMentor,
  accessToken,
  getMentorStatus,
  errMessage,
  setMentorPk,
  htUserType,
}) => {
  const MentorList = mentorList.map((item, i) => {
    return (
      <HTMentorListItemComponent
        key={i}
        htUserType={htUserType}
        deem={deem}
        modal={modal}
        mentor={item}
        setMentorPk={setMentorPk}
      />
    );
  });

  return (
    <Wrapper>
      <Background src={BackgroundImg} alt="Mentor list background" />
      <TitleWrapper>실시간 멘토 현황</TitleWrapper>
      <ContentWrapper>
        <p>실시간 멘토 체크</p>
        {MentorList}
      </ContentWrapper>
    </Wrapper>
  );
};

export default HTMentoringListComponent;
