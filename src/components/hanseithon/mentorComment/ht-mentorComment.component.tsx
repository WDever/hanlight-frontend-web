import * as React from 'react';

import {
  HTMentorCommentMethod,
  HTMentorCommentProps,
} from 'container/hanseithon/mentorComment';
import { Device } from 'lib/styles';
import HTModalPage from 'pages/hanseithon/modal';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import HTTeamItemComponent from './teamItem';

const { useEffect, useState } = React;

const Wrapper = styled.div`
  max-width: 66.25rem;
  width: 90%;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 14.25rem);
  grid-column-gap: 0.5rem;
  grid-row-gap: 2.5rem;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-bottom: 3rem;
  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fill, 9.33rem);
    grid-column-gap: 1.41rem;
    grid-row-gap: 1.62rem;
  }
  @media ${Device.mobileL} {
    grid-row-gap: 1.49rem;
    margin-top: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const HTMentorCommentComponent: React.FC<
  HTMentorCommentProps & HTMentorCommentMethod & RouteComponentProps
> = ({
  getTeam,
  getTeamStatus,
  postMentorComment,
  postMentorCommentStatus,
  teams,
  accessToken,
  deem,
  modal,
  htUserType,
  history,
  modalType,
  setTeamPk,
  errMessage,
}) => {
  useEffect(() => {
    getTeam({ accessToken, category: 'l' });
    getTeam({ accessToken, category: 'g' });
  }, []);

  useEffect(() => {
    if (htUserType !== 'mentor') {
      history.goBack();
    }
  }, []);

  const TeamList = teams.map((item, i) => {
    return (
      <HTTeamItemComponent
        key={i}
        postMentorComment={postMentorComment}
        postMentorCommentStatus={postMentorCommentStatus}
        team={item}
        deem={deem}
        modal={modal}
        setTeamPk={setTeamPk}
      />
    );
  });

  return (
    <>
      {modalType !== 'none' && <HTModalPage />}
      <Wrapper>
        <ListWrapper>{TeamList}</ListWrapper>
      </Wrapper>
    </>
  );
};

export default HTMentorCommentComponent;
