import * as React from 'react';

import {
  NoticePostMethod,
  NoticePostProps,
} from 'container/notice/detail-notice/detail-noticePost';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 3.75rem - 10rem);
  font-family: 'Spoqa Han Sans';
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Notice = styled.div`
  width: 80%;
  max-width: 74.65rem;
`;

const BoardUpsideWrapper = styled.div`
  margin-top: 2.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
  font-size: 1.75rem;
  font-family: 'yg-jalnan';
  font-weight: bold;
`;

const SearchWrapper = styled.div``;

const SearchInput = styled.input`
  width: 12.23rem;
  line-height: 2.4rem;
  padding: 0;
  opacity: 0.5;
  border: solid 1px #bebebe;
  font-size: 1.12rem;
`;

const SearchButton = styled.button`
  width: 3.775rem;
  height: 2.5rem;
  border: 0;
  padding: 0;
  font-size: 0.875rem;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
`;

const Board = styled.div`
  width: 100%;
`;

const BoardTitleWrapper = styled.div`
  width: 100%;
  font-size: 1.125rem;
  border-bottom: solid 1px #000000;
  margin-bottom: 2.625rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BoardTitle = styled.p`
  font-weight: bold;
`;

const BoardTitleDate = styled.p`
  color: #565656;
`;

const BoardContent = styled.div`
  width: 40%;
  margin-bottom: 7rem;
`;

const BoardContentString = styled.p`
  word-break: break-word;
`;

export default class NoticePostComponent extends React.Component<
  NoticePostProps & NoticePostMethod & RouteComponentProps<{ post_pk: string }>
> {
  public state: { searchTitle: undefined | string } = {
    searchTitle: undefined,
  };

  public componentDidMount() {
    if (parseInt(this.props.match.params.post_pk, 10)) {
      this.props.getNoticePost({
        accessToken: this.props.accessToken,
        post_pk: parseInt(this.props.match.params.post_pk, 10),
      });
    } else {
      this.props.history.push('/notice');
    }
  }

  public componentDidUpdate(
    prevProps: NoticePostProps &
      NoticePostMethod &
      RouteComponentProps<{ post_pk: string }>,
  ) {
    if (
      prevProps.getNoticePostStatus === 'pending' &&
      this.props.getNoticePostStatus === 'success' &&
      !this.props.noticeList[
        this.props.noticeList.findIndex(
          val => val.pk === parseInt(this.props.match.params.post_pk, 10),
        )
      ]
    ) {
      this.props.history.push('/notice');
    } else if (this.props.getNoticePostStatus === 'failure') {
      this.props.history.push('/notice');
    }
  }

  public handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchTitle: e.currentTarget.value,
    });

  public search = () =>
    this.props.history.push(`/notice?title=${this.state.searchTitle || ''}`);

  public render() {
    const { getNoticePostStatus, noticeList, match } = this.props;
    const notice =
      noticeList[
        noticeList.findIndex(
          val => val.pk === parseInt(match.params.post_pk, 10),
        )
      ];

    return getNoticePostStatus === 'success' ? (
      <Wrapper>
        <Notice>
          <BoardUpsideWrapper>
            <TitleWrapper>
              <Title>공지사항</Title>
            </TitleWrapper>
            <SearchWrapper>
              <SearchInput onChange={this.handleInput} />
              <SearchButton onClick={this.search}>검색</SearchButton>
            </SearchWrapper>
          </BoardUpsideWrapper>
          <Board>
            <BoardTitleWrapper>
              <BoardTitle>{notice.title}</BoardTitle>
              <BoardTitleDate>
                {moment(notice.createdAt).format('YYYY.MM.DD')}
              </BoardTitleDate>
            </BoardTitleWrapper>
            <BoardContent>
              {(notice.content || '').split('\\n').map((val, i) => (
                <BoardContentString key={i}>{val}</BoardContentString>
              ))}
            </BoardContent>
          </Board>
        </Notice>
      </Wrapper>
    ) : (
      <Wrapper style={{ height: '100%' }} />
    );
  }
}
