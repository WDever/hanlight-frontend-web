import * as React from 'react';

import BoardCommentContainer from 'container/board/comment';
import { usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import DeleteIcon from 'lib/svg/delete-icon.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import EditIcon from 'lib/svg/edit-icon.svg';
import EmptyLikeIcon from 'lib/svg/Empty-like.svg';
import LeftArrow from 'lib/svg/left-arrow.svg';
import LikeIcon from 'lib/svg/like.svg';
import ReportIcon from 'lib/svg/report-icon.svg';
import RightArrow from 'lib/svg/right-arrow.svg';
import moment from 'moment';
import 'moment/locale/ko';
import {
  Board,
  BoardApiModel,
  LikeParams,
  OptionData,
} from 'store';
import styled, { css } from 'styled-components';

const FeedWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 1rem;

  @media ${Device.tabletL} {
    margin: 0;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 2.875rem;
  }

  @media ${Device.mobileL} {
    padding-bottom: 1.375rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feed = styled.div`
  width: 93%;

  @media ${Device.tabletL} {
    width: 100%;
    align-items: center;
  }

  font-family: 'Spoqa Han Sans';
  margin-top: 1.125rem;
  position: relative;

  display: flex;
  flex-direction: column;
`;

const FeedHeadWrapper = styled.div`
  width: 100%;
  height: 3.125rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    width: 91.5%;
  }
`;
const FeedHeadLeftWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProfileImg = styled.img<{ image: boolean }>`
  width: 2.69rem;

  ${({ image }) =>
    image &&
    css`
      height: 2.69rem;
      margin-bottom: 0.56rem;
      border-radius: 100%;
      border: 1px solid #d1d1d1;

      @media ${Device.tabletL} {
        height: 3.5rem;
        margin-bottom: 0.75rem;
      }

      @media ${Device.mobileL} {
        height: 2rem;
        margin-bottom: 0.43rem;
      }
    `}

    @media ${Device.tabletL} {
      width: 3.5rem;
    }

    @media ${Device.mobileL} {
      width: 2rem;
    }
`;

const FeedHeadLeftString = styled.div`
  margin-left: 0.75rem;
`;
const FeedHeadName = styled.p`
  font-size: 0.875rem;
  color: #443898;
  margin: 0;

  @media ${Device.tabletL} {
    font-size: 1.125rem;
    color: black;
    font-weight: bold;
  }

  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;
const FeedHeadDate = styled.p`
  font-size: 0.75rem;
  color: #616770;
  margin: 0;

  @media ${Device.tabletL} {
    font-size: 0.9275rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;
  }
`;
const FeedHeadOptionBtn = styled.img`
  width: 20px;
  cursor: pointer;
  outline: none;

  @media ${Device.tabletL} {
    width: 17.5px;
  }

  @media ${Device.mobileL} {
    width: 12.6px;
  }
`;

const FeedOptionWrapper = styled.div`
  width: 6.875rem;
  background-color: #ffffff;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 2rem;
  cursor: pointer;
  z-index: 1;
  outline: none;
`;

const FeedOption = styled.div`
  width: 100%;
  height: 2.125rem;
  border: solid 0.5px #707070;
  font-size: 0.75rem;

  display: flex;
  align-items: center;
`;

const FeedOptionImg = styled.img`
  margin-left: 0.68rem;
  margin-right: 0.7rem;
`;

const FeedBody = styled.div`
  width: 100%;

  @media ${Device.tabletL} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FeedContentWrapper = styled.div`
  margin-bottom: 0.625rem;

  @media ${Device.tabletL} {
    width: 91.5%;
  }
`;

const FeedContent = styled.span`
  font-size: 0.875rem;
  line-height: 1.43;
  color: #1d2129;
  display: block;
  word-break: break-word;

  @media ${Device.tabletL} {
    font-size: 1rem;
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;
  }
`;

const FeedImgContainer = styled.div`
  width: 100%;
  height: 31rem;
  max-height: 40.25rem;
  position: relative;
  margin-bottom: 0.875rem;

  @media ${Device.tabletL} {
    width: 91.5%;
    height: 31.25rem;
  }

  @media ${Device.mobileL} {
    width: 100%;
    height: 21.25rem;
  }
`;

const FeedImgWrapper = styled.div<{ rows: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  grid-template-columns: 50% 50%;
  grid-template-rows: ${({ rows }) =>
    rows <= 2 ? '100%' : rows === 3 ? '60% 40%' : '50% 50%'};

  @media ${Device.tabletL} {
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
`;

const FeedImg = styled.img<{ rows: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const FeedMoreImg = styled.div<{ img: string }>`
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: multiply;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedMoreImgSpan = styled.span`
  font-size: 3rem;
  color: #ffffff;
`;

const FeedImgToggleWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  z-index: 3;
`;

const FeedImgToggle = styled.img`
  width: 100%;
  object-fit: contain;
`;

const FeedXButton = styled.span<{
  width: number;
  height: number;
  top: number;
  left: number;
  color: string;
}>`
  position: absolute;
  right: 0;
  top: ${props => props.top}rem;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    position: absolute;
    left: ${props => props.left}px;
    content: ' ';
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border-radius: 1.25rem;
    background-color: ${props => props.color};
  }
`;

const FeedImgToggleArrow = styled.img`
  position: absolute;
  top: 45%;
  cursor: pointer;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${Device.tabletL} {
    width: 100%;
    align-items: center;
  }
`;

const LikeView = styled.div`
  font-size: 0.82rem;
  color: #414141;
  margin-bottom: 1rem;

  @media ${Device.tabletL} {
    width: 91.5%;
    font-size: 1rem;

    img {
      width: 20px;
      height: 20px;
    }
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;

    img {
      width: 14px;
      height: 14px;
    }
  }
`;

const LikeBtnWrapper = styled.div`
  width: 100%;
  height: 2.75rem;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
`;

const LikeBtn = styled.button<{ clicked: boolean }>`
  width: 35%;
  height: 100%;
  margin-left: 1.5rem;
  border: 0;
  font-size: 0.875rem;
  font-weight: ${props => (props.clicked ? 'bold' : 'normal')};
  color: ${props => (props.clicked ? '#4470ff' : '#1d2129')};
  background-color: #ffffff;
  padding: 0;
  cursor: pointer;

  @media ${Device.tabletL} {
    font-size: 1rem;

    img {
      width: 20px;
      height: 20px;
    }
  }

  @media ${Device.mobileL} {
    font-size: 0.6875rem;

    img {
      width: 14px;
      height: 14px;
    }
  }
`;

type status = 'none' | 'pending' | 'success' | 'failure';

interface FeedItemProps {
  accessToken: string;
  board: Board;
  likeStatus: status;
  deemBoardStatus: boolean;
  boardApiStatus: BoardApiModel;
}

interface FeedItemMethod {
  getBoardComments: (payload: { board_pk: number; page: number }) => void;
  like: (payload: LikeParams) => void;
  deemBoard: (payload: boolean) => void;
  activeReport(data: boolean): void;
  optionToggle(payload: OptionData): void;
}

const FeedItemComponent: React.FC<FeedItemProps & FeedItemMethod> = ({
  accessToken,
  board,
  getBoardComments,
  like,
  likeStatus,
  deemBoard,
  activeReport,
  boardApiStatus,
  optionToggle,
}) => {
  const {
    getBoardStatus,
    postBoardStatus,
    patchBoardStatus,
    deleteBoardStatus,
    getLikeListStatus,
  } = boardApiStatus;

  const statusProps: {
    [key: string]: 'none' | 'pending' | 'success' | 'failure';
  } = {
    getBoardStatus,
    postBoardStatus,
    patchBoardStatus,
    deleteBoardStatus,
  };
  const prevStatusProps:
    | { [key: string]: 'none' | 'pending' | 'success' | 'failure' }
    | undefined = usePrevious(statusProps);
  const [page, setPage] = React.useState<number>(1);
  const [imgToggle, setImgToggle] = React.useState<{
    toggle: boolean;
    index: number;
  }>({
    toggle: false,
    index: 0,
  });
  const optionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (prevStatusProps) {
      if (
        Object.keys(prevStatusProps).some(
          status =>
            prevStatusProps[status] === 'pending' &&
            statusProps[status] !== 'pending',
        )
      ) {
        if (imgToggle.toggle) {
          setImgToggle({ toggle: false, index: 0 });
          deemBoard(false);
        }
        optionToggle({
          type: 'none',
          board_pk: 0,
          content: '',
          write: board.write,
        });
      }
    }
  }, [
    activeReport,
    board.pk,
    deemBoard,
    imgToggle.toggle,
    prevStatusProps,
    statusProps,
  ]);

  const GetBoardComments = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (boardApiStatus.getBoardCommentStatus !== 'pending') {
      getBoardComments({ board_pk: board.pk, page });
      setPage(page + 1);
    }
  };

  const imgClicked = (index: number) => {
    setImgToggle({ toggle: true, index });
    deemBoard(true);
  };

  const setOptionFocus = () => {
    if (optionRef && optionRef.current) {
      optionRef.current.focus();
    }
  };

  return (
    <FeedWrapper key={board.pk}>
      <Feed>
        <FeedHeadWrapper>
          <FeedHeadLeftWrapper>
            <ProfileImg
              image={!!board.user_image}
              src={board.user_image || DefaultProfileImage}
              alt="profile"
            />
            <FeedHeadLeftString>
              <FeedHeadName>
                {board.user_name ? board.user_name : '익명'}
              </FeedHeadName>
              <FeedHeadDate>
                {moment(board.createdAt).format('lll')}
                &ensp;
                {board.edited ? '(수정됨)' : ''}
              </FeedHeadDate>
            </FeedHeadLeftString>
          </FeedHeadLeftWrapper>
          <div>
            <FeedHeadOptionBtn
              src={Dotdotdot}
              alt=""
              onClick={() =>{
                optionToggle({
                  type: 'board',
                  board_pk: board.pk,
                  content: board.content,
                  write: board.write
                })
              }
                
              }
            />
          </div>
        </FeedHeadWrapper>
        <FeedBody>
          <FeedContentWrapper>
            <FeedContent>{board.content}</FeedContent>
          </FeedContentWrapper>

          {board.files.length > 0 && (
            <FeedImgContainer>
              <FeedImgWrapper rows={Math.min(4, board.files.length)}>
                {imgToggle.toggle && (
                  <FeedImgToggleWrapper>
                    <FeedXButton
                      width={33}
                      height={3}
                      left={0}
                      top={-1.25}
                      color={'#ffffff'}
                      onClick={() => {
                        setImgToggle({ toggle: false, index: 0 });
                        deemBoard(false);
                      }}
                    />
                    {board.files[imgToggle.index - 1] && (
                      <FeedImgToggleArrow
                        src={LeftArrow}
                        alt=""
                        style={{
                          left: 0,
                          marginLeft: '1rem',
                        }}
                        onClick={() =>
                          setImgToggle({
                            ...imgToggle,
                            index: imgToggle.index - 1,
                          })
                        }
                      />
                    )}
                    {board.files[imgToggle.index + 1] && (
                      <FeedImgToggleArrow
                        src={RightArrow}
                        alt=""
                        style={{
                          right: 0,
                          marginRight: '1rem',
                        }}
                        onClick={() =>
                          setImgToggle({
                            ...imgToggle,
                            index: imgToggle.index + 1,
                          })
                        }
                      />
                    )}
                    <FeedImgToggle src={board.files[imgToggle.index]} alt="" />
                  </FeedImgToggleWrapper>
                )}
                {board.files.slice(0, 4).map((file, i) => {
                  if (i === 3 && board.files.length === 5) {
                    return (
                      <FeedMoreImg
                        img={board.files[i]}
                        key={i}
                        onClick={() => {
                          imgClicked(i);
                          optionToggle({
                            type: 'none',
                            board_pk: 0,
                            content: '',
                            write: board.write,
                          });
                        }}
                      >
                        <FeedMoreImgSpan>
                          {board.files.length - 4}장 +
                        </FeedMoreImgSpan>
                      </FeedMoreImg>
                    );
                  } else {
                    return (
                      <FeedImg
                        rows={Math.min(4, board.files.length)}
                        style={
                          Math.min(4, board.files.length) % 2 === 1 && i === 0
                            ? {
                                gridColumn: '1/3',
                              }
                            : {}
                        }
                        key={i}
                        src={file}
                        onClick={() => {
                          imgClicked(i);
                          optionToggle({
                            type: 'none',
                            board_pk: 0,
                            content: '',
                            write: board.write
                          });
                        }}
                      />
                    );
                  }
                })}
              </FeedImgWrapper>
            </FeedImgContainer>
          )}
          <LikeWrapper>
            <LikeView>
              <img src={LikeIcon} style={{ marginRight: '0.25rem' }} alt="" />
              <span> 좋아요 {board.likeCount}명</span>
            </LikeView>
            <LikeBtnWrapper>
              <LikeBtn
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (likeStatus !== 'pending') {
                    like({ board_pk: board.pk, accessToken, type: 'board' });
                  }
                }}
                clicked={board.isLiked}
              >
                <img
                  src={board.isLiked ? LikeIcon : EmptyLikeIcon}
                  style={{ marginRight: '0.375rem' }}
                  alt=""
                />
                좋아요
              </LikeBtn>
            </LikeBtnWrapper>
          </LikeWrapper>
        </FeedBody>
        <BoardCommentContainer
          board_pk={board.pk}
          board_userName={board.user_name}
          board_write={board.write}
          comment={board.comment}
          commentCount={board.commentCount}
          like={like}
          likeStatus={likeStatus}
          GetBoardComments={GetBoardComments}
          page={page}
          deemBoard={deemBoard}
          boardApiStatus={boardApiStatus}
          optionToggle={optionToggle}
        />
      </Feed>
    </FeedWrapper>
  );
};

export default FeedItemComponent;
