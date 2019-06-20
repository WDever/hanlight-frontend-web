import * as React from 'react';

import BoardCommentsContainer from 'container/board/comments';
import dumbimg from 'lib/png/DevKyongbaek.png';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import DeleteIcon from 'lib/svg/delete-icon.svg';
import Dotdotdot from 'lib/svg/dotdotdot.svg';
import EditIcon from 'lib/svg/edit-icon.svg';
import ReportIcon from 'lib/svg/report-icon.svg';
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
const FeedBodySpan = styled.span`
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

const BoardFeedspage: React.FC = () => {
  const [optionToggle, setOptionToggle] = React.useState<boolean>(false);

  return (
    <>
      <FeedWrapper>
        <Feed>
          <FeedHeadWrapper>
            <FeedHeadLeftWrapper>
              <img src={DefaultProfileImage} alt="" />
              <FeedHeadLeftString>
                <FeedHeadName>김우혁</FeedHeadName>
                <FeedHeadDate>2019년 6월 8일 오후 7:03 (수정됨)</FeedHeadDate>
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
                <FeedOption>
                  <FeedOptionImg src={EditIcon} alt="" />
                  <span>게시글 수정</span>
                </FeedOption>
                <FeedOption>
                  <FeedOptionImg src={DeleteIcon} alt="" />
                  <span>게시글 삭제</span>
                </FeedOption>
                <FeedOption>
                  <FeedOptionImg src={ReportIcon} alt="" />
                  <span>신고하기</span>
                </FeedOption>
              </FeedOptionWrapper>
            </div>
          )}
          <FeedBody>
            <FeedBodySpan>
              가나다라마바사아자차
              카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하
            </FeedBodySpan>
            <FeedBodyImgWrapper rows={1}>
              <FeedBodyImg
                rows={1}
                key={1}
                style={{
                  gridColumn: '1/3',
                  objectFit: 'cover',
                  backgroundColor: '#000000',
                }}
                src={dumbimg}
              />
            </FeedBodyImgWrapper>
          </FeedBody>
          <BoardCommentsContainer board_pk={0} />
        </Feed>
        <CommentAllBtn>전체 댓글 보기</CommentAllBtn>
      </FeedWrapper>
    </>
  );
};

export default BoardFeedspage;
