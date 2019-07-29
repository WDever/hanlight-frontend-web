import * as React from 'react';

import { useInputs } from 'lib/hooks';
import { PostFileParams } from 'store';
import styled from 'styled-components';
import {
  ContentWrapper,
  ModalBox,
  ModalProps,
  TitleWrapper,
  XButton,
} from '../ht-modal.component';

const { useEffect, useState } = React;

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
    align-items: flex-start;

    font-family: 'Noto Sans KR';
    font-size: 13px;

    span {
      margin-left: 0.5rem;
    }

    div {
      margin: 0;

      display: flex;
      justify-content: flex-start;

      div {
        width: 7.5rem;
        height: 2rem;
        border-radius: 1rem;
        background-color: #000000;

        font-family: 'Open Sans';
        font-size: 13px;
        color: #ffffff;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        margin: 0;
        margin-top: 1px;
      }

      p {
        margin: 0;

        border-bottom: 1px solid #000000;

        width: 100%;

        display: flex;
        align-items: center;

        text-indent: 0.5rem;
      }
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

      cursor: pointer;
    }
  }
`;

interface OwnProps {
  postFileStatus: 'none' | 'pending' | 'success' | 'failure';
  postFile(payload: PostFileParams): void;
}

const HTSubmitFormModal: React.FC<ModalProps & OwnProps> = ({
  deem,
  modal,
  postFile,
  postFileStatus,
  accessToken,
  errMessage,
  resetStatus,
}) => {
  const [inputs, setInputs] = useInputs({
    firstLink: '',
    secondLink: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const { firstLink, secondLink } = inputs;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files = e.currentTarget.files;
    // if (files && files.length > 5) {
    //   alert('사진은 최대 5장까지 가능합니다.');
    // } else if (
    //   files &&
    //   files.length !== 0 &&
    //   files.length + files.length <= 5
    // ) {
    //   Array.from(files)
    //     .filter(file => {
    //       if (file.size > 1024 * 1024 * 5) {
    //         alert(`${file.name} 파일이 용량이 커서 업로드할 수 없습니다.`);
    //       } else {
    //         return true;
    //       }
    //     })
    //     .forEach(file => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onloadend = () =>
    //         this.setState({
    //           files: this.state.files.concat({
    //             file,
    //             preview: reader.result as string,
    //           }),
    //         });
    //     });
    //   e.target.value = '';
    // }

    const { files } = e.currentTarget;

    const reader = new FileReader();

    if (files) {
      console.log(files);
      console.log(files[0]);
      console.log(reader.readAsDataURL(files[0]));
      console.log(reader.result);

      setFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (file !== null) {
      postFile({ accessToken, link1: firstLink, link2: secondLink, file });
    } else {
      alert('발표자료를 제출해주세요!');
    }
  };

  useEffect(() => {
    if (postFileStatus === 'success') {
      alert('제출했습니다!');
      deem(false);
      modal('none');
      resetStatus();
    } else if (postFileStatus === 'failure') {
      alert(errMessage);
      deem(false);
      modal('none');
      resetStatus();
    }
  });

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
            <span>파일</span>
            <div>
              <div>파일 제출</div>
              <input
                id="files"
                multiple={true}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFile}
                accept=".pdf, .ppt, .pptx, .key, .zip"
              />
              <p>{file ? file.name : ''}</p>
            </div>
          </label>
          <div>
            <button
              onClick={handleSubmit}
              disabled={postFileStatus === 'pending'}
            >
              제출
            </button>
          </div>
        </SubmitForm>
      </ContentWrapper>
    </ModalBox>
  );
};

export default HTSubmitFormModal;
