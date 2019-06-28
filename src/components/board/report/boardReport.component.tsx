import * as React from 'react';

import {
  BoardReportMethod,
  BoardReportOwnProps,
  BoardReportProps,
} from 'container/board/report';
import { useInput } from 'lib/hooks';
import styled from 'styled-components';

const { useRef } = React;

const ModalWrapper = styled.div`
  width: 100%;
  min-width: 475px;
  max-width: 700px;
  min-height: 13.375rem;
  margin-right: 1.25rem;
  position: absolute;
  top: 30%;
  z-index: 9;
  font-family: 'Spoqa Han Sans';
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Head = styled.div`
  width: 100%;
  min-height: 2.3rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: #ffffff;
  border-bottom: solid 1px #e5e5e5;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeedXButton = styled.span`
  width: 19px;
  top: 17px;
  right: 11px;
  height: 10px;
  border-radius: 1.25rem;
  position: absolute;

  cursor: pointer;

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

const Title = styled.span`
  margin-left: 1.5rem;
`;

const Form = styled.form`
  width: 90%;
  height: 11rem;
  font-size: 0.875rem;
  font-family: inherit;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  textarea {
    min-height: 73.07%;
    font-size: 0.875rem;
    font-family: inherit;
    width: 100%;
    outline: none;
    resize: none;
    border: none;
    padding: 0;
    border-bottom: solid 1px #e5e5e5;
  }

  button {
    width: 6.875rem;
    height: 2rem;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #4470ff;
    border-radius: 1rem;
    color: #e9ebee;
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.57rem;
    cursor: pointer;
  }
`;

interface BoardReportState {
  content: string;
}

export default class BoardReportComponent extends React.Component<
  BoardReportProps & BoardReportMethod & BoardReportOwnProps,
  BoardReportState
> {
  public state: BoardReportState = {
    content: '',
  };

  public componentDidUpdate(prevProps: BoardReportProps) {
    const { reportStatus } = this.props;

    if (prevProps.reportStatus === 'pending' && reportStatus === 'success') {
      this.close();
      alert('정상적으로 신고되었습니다.');
    }
  }

  public submitReport = (e: React.FormEvent<HTMLFormElement>) => {
    const { ActiveReportData, report, accessToken } = this.props;
    const { content } = this.state;

    e.preventDefault();
    if (ActiveReportData.type === 'board') {
      report({
        accessToken,
        type: ActiveReportData.type,
        board_pk: ActiveReportData.board_pk,
        content,
      });
    } else if (ActiveReportData.type === 'comment') {
      report({
        accessToken,
        type: ActiveReportData.type,
        board_pk: ActiveReportData.board_pk,
        comment_pk: ActiveReportData.comment_pk,
        content,
      });
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    this.setState(() => ({
      content: value,
    }));
  };

  public close = () => {
    const { deemBoard, setReportToggle, activeReport } = this.props;
    deemBoard(false);
    setReportToggle(false);
    activeReport({ active: false, type: 'none', board_pk: 0, comment_pk: 0 });
  };

  public render() {
    const { ActiveReportData } = this.props;
    const { close, submitReport, handleChange } = this;

    return (
      <>
        {ActiveReportData.active ? (
          <ModalWrapper>
            <Head>
              <Title>작성자 신고하기</Title>
              <FeedXButton onClick={close} />
            </Head>
            <Form onSubmit={submitReport}>
              <textarea
                minLength={1}
                maxLength={300}
                autoFocus={true}
                placeholder="신고사유를 작성해주세요. (최대 300자)  ex)풍기문란, 욕설, 성희롱"
                onChange={handleChange}
              />
              <button>신고하기</button>
            </Form>
          </ModalWrapper>
        ) : (
          <></>
        )}
      </>
    );
  }
}
