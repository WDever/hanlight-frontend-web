import * as React from 'react';

import { Device } from 'lib/styles';
import { MentorRequestType, ModalTypes } from 'store';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;

  display: flex;

  background-color: #ffffff;

  @media ${Device.mobileL} {
    height: 2.125rem;
  }
`;

const NameBox = styled.div`
  width: 72.4%;
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

const Box = styled.div`
  width: 27.6%;
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

    height: 2.25rem;
    width: 8.7rem;

    border-radius: 1.25rem;
    background-color: #000000;

    @media ${Device.mobileL} {
      width: 5.625rem;
      height: 1.5rem;

      font-size: 11px;
    }
  }
`;

export interface RequestListItemProps {
  mentorRequestItem: MentorRequestType;

  setReqPk(payload: number): void;
  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
}

const HTRequestItemComponent: React.FC<RequestListItemProps> = ({
  deem,
  modal,
  mentorRequestItem,
  setReqPk,
}) => {
  return (
    <Wrapper>
      <NameBox>{mentorRequestItem.team.name}</NameBox>
      <Box>
        <button
          onClick={() => {
            // deem(true);
            // modal('detail-view');
            // setReqPk(mentorRequestItem.pk);
            alert('밤에 공개됩니다.');
          }}
        >
          상세보기
        </button>
      </Box>
    </Wrapper>
  );
};

export default HTRequestItemComponent;
