import * as React from 'react';

import { CompletelyBoxOpacity, DefaultBoxOpacity } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TeamItemComponent from './teamItem';

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

const ExTeam = [
  { name: '김성민', stuNum: 'H2203', leader: true },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
];

const ExTeam2 = [
  { name: '김우혁', stuNum: 'G1101', leader: true },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
  { name: '김성민', stuNum: 'H2203', leader: false },
];

const EsportsComponent: React.FC = () => {
  return (
    <Wrapper>
      <TeamItemComponent
        members={ExTeam}
        teamName="아이언이라도 좋아해줄 수 있나요?"
        ratio={52.1}
        isVoted={false}
        voteTo={0}
      />
      <VS>vs</VS>
      <TeamItemComponent
        members={ExTeam2}
        teamName="우리 학생회가 이렇게 귀여울리가 없어"
        ratio={47.9}
        isVoted={false}
        voteTo={0}
      />
    </Wrapper>
  );
};

export default EsportsComponent;
