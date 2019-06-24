import * as React from 'react';

import BoardCommentContainer from 'container/board/comment';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import DeleteIcon from 'lib/svg/delete-icon.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import EditIcon from 'lib/svg/edit-icon.svg';
import ReportIcon from 'lib/svg/report-icon.svg';
import moment from 'moment';
import 'moment/locale/ko';
import { Board, LikeParams } from 'store';
import styled from 'styled-components';

const FeedWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feed = styled.div`
  width: 93%;
  font-family: 'Spoqa Han Sans';
  margin-top: 1.125rem;

  display: flex;
  flex-direction: column;
`;

const FeedHeadWrapper = styled.div`
  width: 100%;
  height: 3.125rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FeedHeadLeftWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
const FeedHeadLeftString = styled.div`
  margin-left: 0.75rem;
`;
const FeedHeadName = styled.p`
  font-size: 0.875rem;
  color: #443898;
  margin: 0;
`;
const FeedHeadDate = styled.p`
  font-size: 0.75rem;
  color: #616770;
  margin: 0;
`;
const FeedHeadOptionBtn = styled.img`
  width: 20px;
  cursor: pointer;
`;

const FeedOptionWrapper = styled.div`
  width: 6.875rem;
  background-color: #ffffff;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 3.5%;
  top: 50px;
  cursor: pointer;
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
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #d1d1d1;
`;

const FeedContentWrapper = styled.div`
  margin-bottom: 0.625rem;
`;

const FeedContent = styled.span`
  font-size: 0.875rem;
  line-height: 1.43;
  color: #1d2129;
`;

const FeedBodyImgWrapper = styled.div<{ rows: number }>`
  width: 100%;
  height: 31rem;
  max-height: 40.25rem;
  display: grid;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  grid-template-columns: auto auto;
  grid-template-rows: ${props => (props.rows === 3 ? '65% auto' : 'unset')};
`;

const FeedBodyImg = styled.img<{ rows: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: '#000000';
`;

const CommentAllBtn = styled.button`
  width: 100%;
  height: 2.625rem;
  font-size: 0.875rem;
  border: solid 1px #b4b4b4;
  background-color: #ffffff;
  padding: 0;
  cursor: pointer;
`;

const FeedItemComponent: React.FC<{
  board: Board;
  handleOption: ({
    action,
    board_pk,
  }: {
    action: 'delete' | 'edit' | 'report';
    board_pk: number;
  }) => void;
  getBoardComments: ({
    board_pk,
    page,
  }: {
    board_pk: number;
    page: number;
  }) => void;
  like: (data: LikeParams) => void;
  likeStatus: 'none' | 'pending' | 'success' | 'failure';
  getBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
}> = ({
  board,
  handleOption,
  getBoardComments,
  getBoardCommentStatus,
  like,
  likeStatus,
}) => {
  const [optionToggle, setOptionToggle] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const GetBoardComments = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (getBoardCommentStatus !== 'pending') {
      getBoardComments({ board_pk: board.pk, page });
      setPage(page + 1);
    }
  };

  console.log(page);

  return (
    <FeedWrapper key={board.pk}>
      <Feed>
        <FeedHeadWrapper>
          <FeedHeadLeftWrapper>
            <img src={DefaultProfileImage} alt="" />
            <FeedHeadLeftString>
              <FeedHeadName>{board.user_name}</FeedHeadName>
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
              onClick={() => setOptionToggle(!optionToggle)}
            />
          </div>
        </FeedHeadWrapper>
        {optionToggle && (
          <div>
            <FeedOptionWrapper>
              {board.write && (
                <>
                  <FeedOption
                    onClick={() => {
                      handleOption({ action: 'edit', board_pk: board.pk });
                      setOptionToggle(false);
                    }}
                  >
                    <FeedOptionImg src={EditIcon} alt="" />
                    <span>게시글 수정</span>
                  </FeedOption>
                  <FeedOption
                    onClick={() => {
                      handleOption({ action: 'delete', board_pk: board.pk });
                      setOptionToggle(false);
                    }}
                  >
                    <FeedOptionImg src={DeleteIcon} alt="" />
                    <span>게시글 삭제</span>
                  </FeedOption>
                </>
              )}
              <FeedOption
                onClick={() => {
                  handleOption({ action: 'report', board_pk: board.pk });
                  setOptionToggle(false);
                }}
              >
                <FeedOptionImg src={ReportIcon} alt="" />
                <span>신고하기</span>
              </FeedOption>
            </FeedOptionWrapper>
          </div>
        )}
        <FeedBody>
          <FeedContentWrapper>
            <FeedContent>{board.content}</FeedContent>
          </FeedContentWrapper>

          {board.files.length > 0 && (
            <FeedBodyImgWrapper rows={board.files.length}>
              {board.files.map((file, i) => (
                <FeedBodyImg
                  rows={board.files.length}
                  style={
                    board.files.length % 2 === 1 && i === 0
                      ? {
                          gridColumn: '1/3',
                        }
                      : {}
                  }
                  key={i}
                  src={file}
                />
              ))}
            </FeedBodyImgWrapper>
          )}
        </FeedBody>
        <BoardCommentContainer
          board_pk={board.pk}
          comments={board.comment}
          commentCount={board.commentCount}
          like={like}
          likeStatus={likeStatus}
          GetBoardComments={GetBoardComments}
          page={page}
        />
      </Feed>
      {/* {board.commentCount > 3 &&
        (page === 1 || Math.ceil(board.commentCount / 10) >= page) && (
          <CommentAllBtn onClick={GetBoardComments}>
            전체 댓글 보기
          </CommentAllBtn>
        )} */}
    </FeedWrapper>
  );
};

export default FeedItemComponent;
