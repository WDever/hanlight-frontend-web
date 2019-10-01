import * as React from 'react';

import { DefaultBoxOpacity } from 'lib/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  festivalActions,
  festivalReducerActions,
  FSLolTeamMemberModel,
} from 'store';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;

  border-radius: 0.375rem;

  background-color: ${DefaultBoxOpacity};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TeamName = styled.h1`
  margin: 0;
  margin: 1.25rem 0 0.75rem 0;

  font-family: 'yg-jalnan';
  font-size: 1rem;
  color: #e4e4e4;
`;

const MembersWrapper = styled.section`
  width: 17rem;

  display: flex;
  flex-flow: wrap;
  justify-content: center;

  margin-bottom: 15px;
`;

const Members = styled.h1`
  margin: 0;

  font-size: 13px;
  font-family: 'Spoqa Han Sans';
  color: #e4e4e4;

  margin-right: 0.625rem;

  :last-of-type {
    margin: 0;
  }
`;

const Btn = styled.button<{ isVoted: boolean }>`
  border: none;
  outline: none;

  width: 16.625rem;
  height: 2.5rem;

  border-radius: 0.375rem;

  background-color: ${({ disabled, isVoted }) =>
    disabled && isVoted ? '#9f69e0' : !disabled ? '#6488ff' : '#818181'};

  color: #454545;
  font-size: 13px;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;

  margin-bottom: 1.25rem;
`;

interface TeamItemProps {
  teamName: string;
  members: FSLolTeamMemberModel[];
  ratio: string;
  isVoted: boolean;
  userVoted: boolean;
  teamPk: number;
}

const TeamItemComponent: React.FC<TeamItemProps> = ({
  teamName,
  members,
  ratio,
  isVoted,
  userVoted,
  teamPk,
}) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const memberList = members.map((item, i) => (
    <Members key={i}>
      {item.leader && '👑'}
      {item.studentId} {item.name}
    </Members>
  ));

  const btnTxt = isVoted ? '투표완료' : '투표하기';

  const openTime =
    141500 <= Number(moment().format('Hmmss')) &&
    Number(moment().format('Hmmss')) <= 150000;

  const voteFunc = () => {
    openTime
      ? dispatch(
          festivalActions.toggleModal({
            status: true,
            data: {
              type: 'lol',
              content: teamName,
              team: {
                name: teamName,
                teamPk,
              },
            },
          }),
        )
      : alert('아직 투표 시간이 아닙니다.');
  };

  return (
    <Wrapper>
      <TeamName>{teamName}</TeamName>
      <MembersWrapper>{memberList}</MembersWrapper>
      <Btn isVoted={isVoted} onClick={voteFunc} disabled={userVoted}>
        {btnTxt} ({ratio})
      </Btn>
    </Wrapper>
  );
};

export default TeamItemComponent;
