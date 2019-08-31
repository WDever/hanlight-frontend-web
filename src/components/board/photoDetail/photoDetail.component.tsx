import * as React from 'react';

import { Deem, Device } from 'lib/styles';
import LeftArrow from 'lib/svg/left-arrow.svg';
import RightArrow from 'lib/svg/right-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState, boardActions, BoardModel, boardReducerActions } from 'store';
import styled from 'styled-components';

const { useState } = React;

const Wrapper = styled(Deem)`
  height: calc(100% - 3.75rem);
`;

const Hidden = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  z-index: 3;
`;

const FeedImgToggle = styled.img`
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
  z-index: 4;

  @media ${Device.mobileL} {
    margin-top: 2.375rem;

    max-height: 85%;
  }
`;

const FeedXButton = styled.span`
  position: absolute;
  right: 1rem;
  top: 1.75rem;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 5;

  @media ${Device.mobileL} {
    width: 22px;
    right: 0;
    top: 1rem;
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    position: absolute;
    left: 0px;
    content: ' ';
    height: 3px;
    width: 33px;
    border-radius: 1.25rem;
    background-color: ${props => props.color};

    @media ${Device.mobileL} {
      width: 22px;
    }
  }
`;

const FeedImgToggleArrow = styled.img`
  position: absolute;
  top: 45%;
  cursor: pointer;
  z-index: 4;
`;

const PhotoDetailComponent: React.FC = () => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { photoDetailData } = useSelector<AppState, BoardModel>(
    state => state.board,
  );

  const { boardFiles, idx } = photoDetailData;

  const { photoDetailToggle } = boardActions;

  const [index, setIndex] = useState<number>(idx);

  return (
    <Wrapper>
      <Hidden
        onClick={() =>
          dispatch(photoDetailToggle({ status: false, board_pk: 0, idx: 0 }))
        }
      />
      <FeedXButton
        color={'#ffffff'}
        onClick={() =>
          dispatch(photoDetailToggle({ status: false, board_pk: 0, idx: 0 }))
        }
      />
      <FeedImgToggle src={boardFiles[index]} alt="" />
      {boardFiles[index - 1] && (
        <FeedImgToggleArrow
          src={LeftArrow}
          alt="arrow button"
          style={{
            left: 0,
            marginLeft: '1rem',
          }}
          onClick={() => setIndex(index - 1)}
        />
      )}
      {boardFiles[index + 1] && (
        <FeedImgToggleArrow
          src={RightArrow}
          alt=""
          style={{
            right: 0,
            marginRight: '1rem',
          }}
          onClick={() => setIndex(index + 1)}
        />
      )}
    </Wrapper>
  );
};

export default PhotoDetailComponent;
