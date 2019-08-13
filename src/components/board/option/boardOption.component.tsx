import * as React from 'react';

import BoardReportComponent from '../report';
import CommentOptionComponent from './comment';
import FeedOptionComponent from './feed';
import FeedEditComponent from './feed/edit';

import { Device } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState, boardActions, BoardModel, boardReducerActions } from 'store';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(23, 23, 23, 0.6);

  z-index: 2;
`;

const Hidden = styled.div`
  width: 100%;
  height: 100%;
`;

export const OptionBox = styled.div`
  position: absolute;

  width: 26.25rem;

  border-radius: 0.5rem;

  background-color: #ffffff;

  z-index: 2;

  @media ${Device.tabletL} {
    width: 17.5rem;
  }

  @media ${Device.mobileL} {
    width: 11.6625rem;
  }

  button {
    width: 100%;
    height: 4.5rem;

    background-color: #ffffff;

    border: none;
    border-bottom: 1px solid #e6e6e6;
    outline: none;

    cursor: pointer;

    @media ${Device.tabletL} {
      height: 3rem;
    }

    @media ${Device.mobileL} {
      height: 2rem;
    }

    span {
      font-family: 'Spoqa Han Sans';
      font-size: 19px;

      @media ${Device.mobileL} {
        font-size: 14px;
      }
    }

    :first-of-type {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }

    :last-of-type {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`;

export const BlueTxt = styled.span`
  color: #4470ff;
`;

export const RedTxt = styled.span`
  color: #ff4450;
`;

const BoradOptionComponent: React.FC = () => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { optionData } = useSelector<AppState, BoardModel>(
    state => state.board,
  );
  const { activeReportStatus } = useSelector<AppState, BoardModel>(
    state => state.board,
  );
  const { editBoardToggleStatus } = useSelector<AppState, BoardModel>(
    state => state.board,
  );

  const { optionToggle, activeReport, editBoardToggle } = boardActions;

  const close = () => {
    dispatch(
      optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );
    dispatch(activeReport(false));
    dispatch(editBoardToggle(false));
  };

  return (
    <Wrapper>
      <Hidden onClick={close} />
      {activeReportStatus ? (
        <BoardReportComponent />
      ) : editBoardToggleStatus ? (
        <FeedEditComponent />
      ) : optionData.type === 'board' ? (
        <FeedOptionComponent optionData={optionData} />
      ) : (
        <CommentOptionComponent optionData={optionData} />
      )}
    </Wrapper>
  );
};

export default BoradOptionComponent;
