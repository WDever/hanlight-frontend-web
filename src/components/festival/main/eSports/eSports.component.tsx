import * as React from 'react';

import { usePrevious } from 'lib/hooks';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  FSLolTeamModel,
  UserModel,
} from 'store';
import styled from 'styled-components';
import TeamItemComponent from './teamItem';

const { useEffect } = React;

const Wrapper = styled.article`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VS = styled.h1`
  font-family: 'yg-jalnan';
  font-size: 1rem;
  color: #e4e4e4;

  margin: 0.75rem 0;
`;

const EsportsComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { getLolTeam } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );
  const { teams, festivalStatus } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  const { getLolTeamStatus, postLolVoteStatus } = festivalStatus;

  const prevStatus = usePrevious({ postLolVoteStatus });

  const teamList =
    getLolTeamStatus === 'success'
      ? teams.map((item: FSLolTeamModel, i: number, org: FSLolTeamModel[]) => (
          <TeamItemComponent
            key={item.pk}
            members={item.member}
            teamName={item.name}
            ratio={item.voteRatio}
            isVoted={item.isVote}
            userVoted={org.some(item => item.isVote)}
            teamPk={item.pk}
          />
        ))
      : [];

  useEffect(() => {
    dispatch(getLolTeam({ accessToken }));
  }, [accessToken]);

  useEffect(() => {
    if (prevStatus && prevStatus.postLolVoteStatus === 'pending') {
      if (postLolVoteStatus === 'success') {
        alert('투표 성공');
      } else if (postLolVoteStatus === 'failure') {
        alert(errorMessage);
      }
    }
  }, [prevStatus, postLolVoteStatus]);

  return (
    <Wrapper>
      {teamList[0]}
      <VS>vs</VS>
      {teamList[1]}
    </Wrapper>
  );
};

export default EsportsComponent;
