import * as React from 'react';

import { Device } from 'lib/styles';
import { HtUserType, MentorType, ModalTypes } from 'store';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 4rem;

  background-color: #ffffff;

  display: flex;
  justify-content: center;

  @media ${Device.mobileL} {
    height: 2.125rem;
  }
`;

const NameBox = styled.div`
  width: 88.4%;
  height: 100%;
  border: solid 1px #e8e8e8;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Open Sans';
  font-size: 19px;
  font-weight: bold;

  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;

const LightBox = styled.div`
  width: 16.6%;
  height: 100%;

  border: solid 1px #e8e8e8;

  display: flex;

  justify-content: center;
  align-items: center;

  button {
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 1rem;
    color: #ffffff;

    cursor: pointer;

    width: 5.375rem;
    height: 2.25rem;
    border-radius: 1.25rem;
    background-color: #000000;

    @media ${Device.mobileL} {
      width: 3.375rem;
      height: 1.5rem;

      font-size: 11px;
    }
  }

  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ef0058;

    @media ${Device.mobileL} {
      width: 0.65rem;
      height: 0.65rem;
    }
  }
`;

export interface MentorListItemProps {
  htUserType: HtUserType;
  mentor: MentorType;
  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
  setMentorPk(payload: number): void;
}

const HTMentorListItemComponent: React.FC<MentorListItemProps> = ({
  modal,
  deem,
  setMentorPk,
  mentor,
  htUserType,
}) => {
  const submitMentoring = () => {
    modal('request');
    deem(true);
    setMentorPk(mentor.pk);
  };

  return (
    <Content>
      <NameBox>{mentor.name}</NameBox>
      <LightBox>
        <button
          onClick={
            htUserType === 'attendee'
              ? submitMentoring
              : () => alert('멘토링 신청은 참가자만 가능합니다.')
          }
        >
          신청
        </button>
      </LightBox>
    </Content>
  );
};

export default HTMentorListItemComponent;
