import * as React from 'react';

import { DefaultBoxOpacity } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { festivalActions, festivalReducerActions } from 'store';
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

const Btn = styled.button<{ voteTo: boolean; isVoted: boolean }>`
  border: none;
  outline: none;

  width: 16.625rem;
  height: 2.5rem;

  border-radius: 0.375rem;

  background-color: ${({ voteTo, isVoted }) =>
    voteTo && isVoted ? '#9f69e0' : isVoted ? '#818181' : '#6488ff'};

  color: #454545;
  font-size: 13px;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;

  margin-bottom: 1.25rem;
`;

interface MemberType {
  name: string;
  stuNum: string;
  leader?: boolean;
}

interface TeamItemProps {
  teamName: string;
  members: MemberType[];
  ratio: number;
  isVoted: boolean;
  voteTo: number;
}

const TeamItemComponent: React.FC<TeamItemProps> = ({
  teamName,
  members,
  ratio,
  isVoted,
  voteTo,
}) => {
  const dispatch: Dispatch<festivalReducerActions> = useDispatch();

  const memberList = members.map((item, i) => (
    <Members key={i}>
      {item.leader && '👑'}
      {item.stuNum} {item.name}
    </Members>
  ));

  return (
    <Wrapper>
      <TeamName>{teamName}</TeamName>
      <MembersWrapper>{memberList}</MembersWrapper>
      <Btn
        isVoted={isVoted}
        voteTo={voteTo === 0}
        onClick={() =>
          dispatch(
            festivalActions.toggleModal({
              status: true,
              data: {
                type: 'lol',
                content: teamName,
                acceptEvent: () => alert(`${teamName}에 투표`),
              },
            }),
          )
        }
        disabled={isVoted}
      >
        {isVoted ? '투표완료' : '투표하기'} ({ratio}%)
      </Btn>
    </Wrapper>
  );
};

export default TeamItemComponent;
