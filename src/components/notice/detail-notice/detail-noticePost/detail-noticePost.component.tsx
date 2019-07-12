import * as React from 'react';

import {
  NoticePostMethod,
  NoticePostProps,
} from 'container/notice/detail-notice/detail-noticePost';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Device } from 'lib/styles';

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

  @media ${Device.tabletL} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BoardUpsideWrapper = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  margin-bottom: 1.35rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    width: 80%;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 1.56rem;
    margin-top: 3.53rem;
    border-bottom: solid 1px #707070;
  }
  @media ${Device.mobileL} {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 0.78rem;
    margin-top: 1.75rem;
    margin-bottom: 1.53rem;
  }
`;

const Title = styled.span`
  font-size: 1.75rem;
  font-family: 'yg-jalnan';
  font-weight: bold;

  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const SearchWrapper = styled.div`
  @media ${Device.tabletL} {
    display: none;
  }
`;

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

const ListShortCut = styled.span`
  display: none;

  @media ${Device.tabletL} {
    color: #000000;
    font-family: 'Spoqa Han Sans';
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    display: unset;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
`;

const Board = styled.div`
  width: 100%;

  @media ${Device.tabletL} {
    width: 80%;
  }
  @media ${Device.mobileL} {
    width: 90%;
  }
`;

const BoardTitleWrapper = styled.div`
  width: 100%;
  font-size: 1.125rem;
  border-bottom: solid 1px #000000;
  margin-bottom: 2.61rem;
  padding-bottom: 0.83rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media ${Device.tabletL} {
    padding-bottom: 0.52rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1.98rem
    padding-bottom: 0.4rem;
  }
`;

const BoardTitle = styled.span`
  font-weight: bold;
  font-size: inherit;

  @media ${Device.tabletL} {
    font-size: 1.25rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.82rem;
  }
`;

const BoardTitleDate = styled.span`
  color: #565656;
  margin-left: 0.25rem;

  @media ${Device.mobileL} {
    font-size: 0.68rem;
  }
`;

const BoardContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  ul {
    list-style: circle;
  }
  p {
    margin: 0;
  }

  @media ${Device.tabletL} {
    font-size: 1.125rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.75rem;
  }
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
      this.props.history.push('/error');
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
      this.props.history.push('/error');
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
            <Title>공지사항</Title>
            <SearchWrapper>
              <SearchInput onChange={this.handleInput} />
              <SearchButton onClick={this.search}>검색</SearchButton>
            </SearchWrapper>
            <ListShortCut onClick={() => this.props.history.push('/notice')}>
              목록 >
            </ListShortCut>
          </BoardUpsideWrapper>
          <Board>
            <BoardTitleWrapper>
              <BoardTitle>{notice.title}</BoardTitle>
              <BoardTitleDate>
                {moment(notice.createdAt).format('YYYY.MM.DD')}
              </BoardTitleDate>
            </BoardTitleWrapper>
            <BoardContent>
              {notice.content && (
                <div dangerouslySetInnerHTML={{ __html: notice.content }} />
              )}
            </BoardContent>
          </Board>
        </Notice>
      </Wrapper>
    ) : (
      <Wrapper style={{ height: '100%' }} />
    );
  }
}
