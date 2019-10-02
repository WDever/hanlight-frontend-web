import * as React from 'react';

import { usePrevious } from 'lib/hooks';
import { DefaultBoxOpacity } from 'lib/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  ErrorModel,
  festivalActions,
  FestivalModel,
  festivalReducerActions,
  FSSingerModel,
  UserModel,
} from 'store';
import styled from 'styled-components';

const { useEffect, useMemo } = React;

const Wrapper = styled.article`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 0.625rem;
`;

const NameBox = styled.section`
  width: 14.75rem;
  height: 2.875rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  h1 {
    font-family: 'yg-jalnan';
    font-size: 0.875rem;
    color: #e4e4e4;

    margin: 0;
  }
`;

const VoteBtn = styled.button<{ voted: boolean }>`
  width: 5rem;
  height: 2.875rem;

  font-family: 'Spoqa Han Sans';
  font-size: 13px;
  font-weight: bold;
  color: #454545;

  border-radius: 0.375rem;

  background-color: ${({ voted, disabled }) =>
    voted && disabled ? '#9f69e0' : disabled ? '#818181' : '#6488ff'};

  border: none;
  outline: none;
`;

const NotNowBox = styled.section`
  width: 100%;
  min-height: 15.625rem;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: 'yg-jalnan';
    font-size: 1rem;
    color: #e4e4e4;

    span {
      color: #ff5677;
    }
  }
`;

const FSSingerComponent: React.FC = () => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();
  const { getSinger } = festivalActions;

  const { accessToken } = useSelector<AppState, UserModel>(state => state.user);
  const { singers, festivalStatus } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );
  const { message: errorMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { getSingerStatus, postSingerVoteStatus } = festivalStatus;

  const prevStatus = usePrevious({ postSingerVoteStatus });

  const openTime =
    150500 <= Number(moment().format('Hmmss')) &&
    Number(moment().format('Hmmss')) <= 153000;

  const voteFunc = (name: string, singerPk: number) =>
    dispatch(
      festivalActions.toggleModal({
        status: true,
        data: {
          type: 'singer',
          content: name,
          singer: {
            name,
            singerPk,
          },
        },
      }),
    );

  const participantList = useMemo(
    () =>
      getSingerStatus === 'success'
        ? singers.map(
            (item: FSSingerModel, i: number, org: FSSingerModel[]) => (
              <Wrapper key={i}>
                <NameBox>
                  <h1>{item.name}</h1>
                </NameBox>
                <VoteBtn
                  voted={item.isVote}
                  disabled={org.some(item => item.isVote)}
                  onClick={() => voteFunc(item.name, item.pk)}
                >
                  {item.isVote ? '투표완료' : '투표하기'}
                </VoteBtn>
              </Wrapper>
            ),
          )
        : [],
    [getSingerStatus, singers],
  );

  useEffect(() => {
    dispatch(getSinger({ accessToken }));
  }, [accessToken]);

  useEffect(() => {
    if (prevStatus && prevStatus.postSingerVoteStatus === 'pending') {
      if (postSingerVoteStatus === 'failure') {
        alert(errorMessage);
      } else if (postSingerVoteStatus === 'success') {
        alert('투표 성공');
      }
    }
  }, [postSingerVoteStatus, prevStatus]);

  return (
    <>
      {openTime ? (
        participantList
      ) : (
        <NotNowBox>
          <h1>
            지금은 복면가왕 투표 시간이 <span>아닙니다.</span>
          </h1>
        </NotNowBox>
      )}
    </>
  );
};

export default FSSingerComponent;
