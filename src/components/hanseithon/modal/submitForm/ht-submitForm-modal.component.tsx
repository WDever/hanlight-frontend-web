import * as React from 'react';

import { useInputs } from 'lib/hooks';
import styled from 'styled-components';
import {
  ContentWrapper,
  ModalBox,
  ModalProps,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

const { useEffect } = React;

const Title = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-top: 2rem;

  p {
    font-family: 'yg-jalnan';
    font-size: 1.5rem;

    margin: 0;
  }
`;

const SubmitForm = styled.form`
  width: 100%;

  margin-top: 1rem;

  label {
    margin-bottom: 0.25rem;

    width: 100%;

    display: flex;
    flex-direction: column;

    font-family: 'Noto Sans KR';
    font-size: 13px;

    span {
      margin-left: 0.5rem;
    }
  }

  input {
    width: 100%;
    height: 1.5rem;

    border-radius: 0.5rem;
    border: solid 1px #000000;

    background-color: #ffffff;

    text-indent: 0.5rem;

    ::placeholder {
      text-indent: 0.5rem;
    }
  }

  div {
    width: 100%;

    margin-top: 1.25rem;
    margin-bottom: 1.75rem;

    display: flex;
    justify-content: center;

    button {
      width: 7.5rem;
      height: 2rem;
      border-radius: 1rem;
      background-color: #000000;

      font-family: 'Open Sans';
      font-size: 13px;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;

const ButtonWrapper = styled.div``;

interface OwnProps {}

const HTSubmitFormModal: React.FC<ModalProps & OwnProps> = ({
  deem,
  modal,
}) => {
  const [inputs, setInputs] = useInputs({
    firstLink: '',
    secondLink: '',
    thirdLink: '',
  });

  const { firstLink, secondLink, thirdLink } = inputs;

  return (
    <ModalBox>
      <XButton
        onClick={() => {
          deem(false);
          modal('none');
        }}
      />
      <ContentWrapper>
        <Title>
          <p>링크 제출</p>
        </Title>
        <SubmitForm>
          <label>
            <span>링크1</span>
            <input
              type="text"
              value={firstLink}
              onChange={setInputs}
              name="firstLink"
              placeholder="C:\Users\dlals\Desktop\ui8"
            />
          </label>
          <label>
            <span>링크2</span>
            <input
              type="text"
              value={secondLink}
              onChange={setInputs}
              name="secondLink"
              placeholder="C:\Users\dlals\Desktop\ui8"
            />
          </label>
          <label>
            <span>링크3</span>
            <input
              type="text"
              value={thirdLink}
              onChange={setInputs}
              name="thirdLink"
              placeholder="C:\Users\dlals\Desktop\ui8"
            />
          </label>
          <div>
            <button>제출</button>
          </div>
        </SubmitForm>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTSubmitFormModal;
