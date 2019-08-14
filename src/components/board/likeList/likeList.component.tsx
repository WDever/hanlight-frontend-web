import * as React from 'react';

import { Deem, Device } from 'lib/styles';
import LikeImg from 'lib/svg/like.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  BoardModel,
  boardReducerActions,
  ErrorModel,
} from 'store';
import styled from 'styled-components';
import LikeListItemComponent from './likeListItem';

const { useEffect } = React;

const Wrapper = Deem;

const Hidden = styled.div`
  width: 100%;
  height: 100%;
`;

const ListBox = styled.div`
  position: absolute;

  width: 27.875rem;
  height: 39.5rem;

  background-color: #ffffff;

  border-radius: 0.25rem;

  :first-of-type {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }

  :last-of-type {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  @media ${Device.tabletS} {
    height: 26.25rem;
  }

  @media ${Device.mobileL} {
    width: 18.75rem;
    height: 26.25rem;
  }
`;

const LikeListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 3rem);

  overflow-y: scroll;
`;

const FeedXButton = styled.span`
  width: 19px;
  height: 10px;
  top: 23px;
  right: 11px;
  border-radius: 1.25rem;
  position: absolute;

  cursor: pointer;

  @media ${Device.mobileL} {
    top: 16px;
    right: 4px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
    width: 19px;
    position: absolute;
    content: ' ';
    border-radius: 1.25rem;
    background-color: #9b9b9b;
  }
`;

const ListHeader = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: solid 1px #d1d1d1;

  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  color: #4470ff;

  @media ${Device.mobileL} {
    height: 2.1875rem;
    font-size: 0.625rem;
  }

  img {
    height: 1rem;
    margin-left: 1.25rem;

    @media ${Device.mobileL} {
      height: 0.75rem;
      margin-left: 0.75rem;
    }
  }

  p {
    flex: 1;
    margin-left: 0.75rem;

    @media ${Device.mobileL} {
      margin-left: 0.25rem;
    }
  }
`;

const LikeListComponent: React.FC = () => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { getLikeListStatus } = useSelector<AppState, BoardModel>(
    state => state.board,
  );
  const { likeList } = useSelector<AppState, BoardModel>(state => state.board);
  const { message: errMessage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const { likeListToggle } = boardActions;

  const LikeList = likeList.map((item, i) => (
    <LikeListItemComponent
      key={i}
      user_image={item.user_image}
      user_name={item.user_name}
    />
  ));

  useEffect(() => {
    if (getLikeListStatus === 'failure') {
      alert(errMessage);
    }
  }, [getLikeListStatus]);

  return (
    <Wrapper>
      <Hidden onClick={() => dispatch(likeListToggle(false))} />
      <ListBox>
        <ListHeader>
          <img src={LikeImg} alt="like" />
          <p>좋아요 {likeList.length}명</p>
          <FeedXButton onClick={() => dispatch(likeListToggle(false))} />
        </ListHeader>
        <LikeListWrapper>{LikeList}</LikeListWrapper>
      </ListBox>
    </Wrapper>
  );
};

export default LikeListComponent;
