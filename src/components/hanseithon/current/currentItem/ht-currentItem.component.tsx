import * as React from 'react';

import ImgSvg from 'lib/svg/team-profile.svg';
import styled from 'styled-components';
import { TeamMemberType } from 'store';

const Box = styled.div`
  width: 14.25rem;
  height: 21.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 9.375rem;
    height: 2.25rem;

    background-color: #000000;
    color: #ffffff;

    border-radius: 1.125rem;
    outline: none;
    border: none;

    margin-top: 1.6875rem;
  }
`;

const ContentWrapper = styled.div`
  font-family: 'Open Sans';

  b {
    font-family: inherit;
    font-size: 1.125rem;
    font-weight: bold;

    margin-top: 2.175rem;
  }

  span {
    font-family: inherit;
    font-size: 0.875rem;
    color: #b4b4b4;
  }

  p {
    font-family: inherit;
    font-size: 0.875rem;

    margin-top: 0.75rem;
  }
`;

const Img = styled.img`
  width: 12.5rem;
  height: 7.75rem;
`;

interface Props {
  name: string;
  leaderName: string;
  teamMember: TeamMemberType[];
}

const HTCurrentItemComponent: React.FC<Props> = ({ name, leaderName, teamMember }) => {
  return (
    <Box>
      <Img src={ImgSvg} alt="Team" />
      <ContentWrapper>
        <b>{name}</b>
        <span>{leaderName}</span>
        <p>정원: 5명 : {teamMember.length}명 신청 가능</p>
      </ContentWrapper>
      <button>참가</button>
    </Box>
  );
};

export default HTCurrentItemComponent;
