import * as React from 'react';

import LImgSvg from 'lib/svg/team-profile.svg';
import GImgSvg from 'lib/svg/team-profile2.svg';
import { CategoryType, Modal, ModalTypes, TeamMemberType } from 'store';
import styled from 'styled-components';

const Box = styled.div<{ active: boolean }>`
  width: 14.25rem;
  height: 21.375rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 0.5rem;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;

  button {
    width: 9.375rem;
    height: 2.25rem;

    background-color: ${props => (props.active ? '#c3c3c3' : '#000000')};
    color: #ffffff;

    border-radius: 1.125rem;
    outline: none;
    border: none;

    font-size: 0.875rem;
    font-weight: bold;

    margin-top: 1.6875rem;
  }
`;

const ContentWrapper = styled.div`
  font-family: 'Open Sans';

  display: flex;
  flex-direction: column;

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
    margin-bottom: 0;
  }
`;

const Img = styled.img`
  width: 12.5rem;
  height: 7.75rem;

  margin-top: 1.5rem;
`;

interface Props {
  name: string;
  leaderName: string;
  teamMember: TeamMemberType[];
  category: CategoryType;
  modal(payload: ModalTypes): void;
}

const HTCurrentItemComponent: React.FC<Props> = ({
  name,
  leaderName,
  teamMember,
  category,
  modal,
}) => {
  return (
    <Box active={teamMember.length === 5}>
      <Img src={category === 'l' ? LImgSvg : GImgSvg} alt="Team" />
      <ContentWrapper>
        <b>{name}</b>
        <span>{leaderName}</span>
        <p>정원: 5명 : {5 - teamMember.length}명 신청 가능</p>
      </ContentWrapper>
      <button onClick={() => modal('join')}>
        {teamMember.length === 5 ? '마감' : '참가'}
      </button>
    </Box>
  );
};

export default HTCurrentItemComponent;
