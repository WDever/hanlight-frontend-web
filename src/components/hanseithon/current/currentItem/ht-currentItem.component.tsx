import * as React from 'react';

import { Device } from 'lib/styles';
import LImgSvg from 'lib/svg/team-profile.svg';
import GImgSvg from 'lib/svg/team-profile2.svg';
import { CategoryType, Modal, ModalTypes, TeamMemberType } from 'store';
import styled from 'styled-components';

const Box = styled.div<{ active: boolean }>`
  width: 100%;
  height: 21.375rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 0.5rem;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;

  @media ${Device.tabletL} {
    height: 13.85rem;
  }

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

    @media ${Device.tabletL} {
      width: 5rem;
      height: 1.5rem;
      font-size: 0.63rem;

      margin-top: 0.75rem;
    }
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

    @media ${Device.tabletL} {
      font-size: 0.8125rem;

      margin-top: unset;
    }
  }

  span {
    font-family: inherit;
    font-size: 0.875rem;
    color: #b4b4b4;

    @media ${Device.tabletL} {
      font-size: 0.625rem;
    }
  }

  p {
    font-family: inherit;
    font-size: 0.875rem;

    margin-top: 0.75rem;
    margin-bottom: 0;

    @media ${Device.tabletL} {
      font-size: 0.625rem;

      margin-top: 0.69rem;
    }
  }
`;

const Img = styled.img`
  width: 12.5rem;
  height: 7.75rem;

  margin-top: 1.5rem;

  @media ${Device.tabletL} {
    width: 8.125rem;
    height: 5rem;

    margin: 1.125rem;
  }
`;

interface Props {
  name: string;
  leaderName: string;
  teamMember: TeamMemberType[];
  category: CategoryType;
  team_pk: number;
  modal(payload: ModalTypes): void;
  setTeamPk(payload: number): void;
}

const HTCurrentItemComponent: React.FC<Props> = ({
  name,
  leaderName,
  teamMember,
  category,
  team_pk,
  modal,
  setTeamPk,
}) => {
  return (
    <Box active={teamMember.length === 5}>
      <Img src={category === 'l' ? LImgSvg : GImgSvg} alt="Team" />
      <ContentWrapper>
        <b>{name}</b>
        <span>{leaderName}</span>
        <p>정원: 5명 / {5 - teamMember.length}명 신청 가능</p>
      </ContentWrapper>
      <button
        onClick={() => {
          modal('join');
          setTeamPk(team_pk);
        }}
      >
        {teamMember.length === 5 ? '마감' : '참가'}
      </button>
    </Box>
  );
};

export default HTCurrentItemComponent;
