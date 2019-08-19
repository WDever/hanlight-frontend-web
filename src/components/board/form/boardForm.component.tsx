import * as React from 'react';

import {
  BoardFormMethod,
  BoardFormProps,
} from 'container/board/form/boardForm.container';
import { Device } from 'lib/styles';
import BlueCheck from 'lib/svg/blue-check.svg';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
import GreyCheck from 'lib/svg/grey-check.svg';
import PictureIcon from 'lib/svg/picture-icon.svg';
import styled, { css } from 'styled-components';

const FormTitle = styled.div`
  width: 100%;
  font-size: 0.875rem;
  border-bottom: solid 1px #d1d1d1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;

  span {
    margin-left: 0.5rem;
  }

  @media ${Device.tabletL} {
    display: none;
  }
`;

const FormType = styled.div<{ checked: boolean }>`
  margin-right: 1.5rem;

  cursor: pointer;

  display: flex;
  align-items: center;

  img {
    height: 1rem;

    margin-top: 0.125rem;
    margin-left: 0.25rem;

    @media ${Device.tabletL} {
      width: 1.125rem;

      margin-left: 5px;
    }

    @media ${Device.mobileL} {
      width: 0.75rem;

      margin-left: 3px;
    }
  }

  span {
    font-family: 'Spoqa Han Sans';
    font-size: 0.875rem;
    font-weight: bold;
    color: ${({ checked }) => (checked ? '#4470ff' : '#d3d3d3')};

    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;

    @media ${Device.tabletL} {
      font-size: 1rem;
    }

    @media ${Device.mobileL} {
      font-size: 11px;
    }
  }
`;

const FormTypeMobile = styled(FormType)`
  margin: 0;

  display: none;

  font-size: 11px;

  @media ${Device.tabletL} {
    display: flex;
  }

  select {
    margin-left: 0.75rem;

    @media ${Device.mobileL} {
      margin-left: 0.5rem;
    }

    font-size: 11px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: #ffffff;
  font-family: 'Spoqa Han Sans';
  margin-bottom: 1rem;

  @media ${Device.tabletL} {
    margin-bottom: 0;
    border: solid 1px #e7e7e7;
    border-radius: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContentWrapper = styled.div`
  @media ${Device.tabletL} {
    width: 91.146%;
  }

  width: 97%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBody = styled.div`
  @media ${Device.tabletL} {
    margin-top: 1.25rem;
  }

  width: 100%;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImg = styled.img<{ image: boolean }>`
    width: 2.69rem;

${({ image }) =>
  image &&
  css`
    height: 2.69rem;
    margin-bottom: 0.56rem;
    border-radius: 100%;

    @media ${Device.mobileL} {
      height: 2rem;
    }
  `}

  @media ${Device.mobileL} {
    width: 2rem;
  }
`;

const FormBodyText = styled.textarea<{ height: number }>`
  width: 88%;
  height: ${props => props.height}px;
  min-height: 3.4rem;
  font-family: inherit;
  font-size: 0.875rem;
  resize: none;
  border: 0;
  box-sizing: border-box;
  outline: none;

  @media ${Device.tabletL} {
    width: 75%;
  }

  @media ${Device.mobileL} {
    min-height: 2rem;

    width: 65%;
  }
`;

const FormImageWrapper = styled.div`
  width: 99%;
  display: flex;
  padding-bottom: 0.75rem;
  border-bottom: solid 1px #e5e5e5;

  @media ${Device.tabletL} {
    border: none;
  }
`;

const FormImageEmpty = styled.label`
  display: inline-block;
  position: relative;
  width: 5rem;
  line-height: 5rem;
  margin-right: 1rem;
  border: 1px dashed #9a9a9a;
  cursor: pointer;

  @media ${Device.mobileL} {
    width: 3.125rem;
    height: 3.125rem;
  }
`;

const FormImageEmptyPlus = styled.span`
  display: inline-block;
  position: relative;
  padding: 0;
  width: 2px;
  height: 26px;
  background-color: #9a9a9a;
  border-radius: 2px;
  left: 40px;
  top: 4.2px;

  @media ${Device.mobileL} {
    top: -29%;
    left: 50%;
    height: 15px;
  }

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: -12.5px;
    width: 26px;
    height: 2px;
    margin-top: -1px;
    border-radius: 2px;
    background-color: #9a9a9a;

    @media ${Device.mobileL} {
      left: -6.75px;
      width: 15px;
    }
  }
`;

const FormPreviewWrapper = styled.div<{ src: string }>`
  width: 5rem;
  height: 5rem;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: multiply;
  position: relative;
  margin-right: 1rem;

  @media ${Device.mobileL} {
    width: 3.125rem;
    height: 3.125rem;
  }
`;

const FormPreviewButton = styled.span`
  position: absolute;
  right: 0px;
  width: 16px;
  height: 16px;

  @media ${Device.mobileL} {
    width: 100%;
    height: 100%;
  }

  &::before,
  &::after {
    position: absolute;
    content: ' ';
    height: 16px;
    width: 2px;

    @media ${Device.mobileL} {
      height: 60%;
      left: 24px;
      top: 10px;
    }

    left: 7px;
    border-radius: 1rem;
    background-color: #ffffff;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const FormButtonWrapper = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-family: 'Spoqa Han Sans';
  background-color: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.mobileL} {
    height: 1.75rem;
    font-size: 0.625rem;
  }
`;

const FormImgLabel = styled.label`
  display: inline-block;
  width: 5.5rem;
  line-height: 2rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 0;
  color: #4b4f56;
  background: url(${PictureIcon}) no-repeat;
  background-position-x: 1rem;
  background-position-y: 0.35rem;
  padding-left: 1.5rem;
  text-align: center;
  cursor: pointer;

  @media ${Device.mobileL} {
    width: 4.75rem;
    background: none;
    padding: 0;

    ::before {
      display: inline-block;
      vertical-align: middle;
      content: url(${PictureIcon});
      zoom: 0.45;
      margin-right: 0.28rem;
    }
  }
`;

const FormSubmitButton = styled.button<{ pending: boolean }>`
  width: 6.875rem;
  height: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border-radius: 1rem;
  font-weight: bold;
  border: 0;
  background-color: ${props => (props.pending ? '#365bd1' : '#4470ff')};
  color: #e9ebee;
  cursor: pointer;

  @media ${Device.mobileL} {
    width: 4.75rem;
    font-size: 0.625rem;
  }
`;

const MAX_CONTENT_SIZE = 600;

export default class BoardFormComponent extends React.Component<
  BoardFormProps & BoardFormMethod
> {
  public state: {
    content: string;
    files: Array<{ file: File; preview: string }>;
    textAreaHeight: number;
    type: boolean;
  } = {
    content: '',
    files: [],
    textAreaHeight: 0,
    type: false,
  };

  public componentDidUpdate(prevProps: BoardFormProps & BoardFormMethod) {
    if (prevProps.postBoardStatus === 'pending') {
      if (this.props.postBoardStatus === 'success') {
        this.setState({
          content: '',
          files: [],
          textAreaHeight: 0,
        });
      }
    }
  }

  public handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length <= MAX_CONTENT_SIZE) {
      this.setState({
        content: e.currentTarget.value,
        textAreaHeight: e.target.scrollHeight,
      });
    }
  };

  public handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 5) {
      alert('사진은 최대 5장까지 가능합니다.');
    } else if (
      files &&
      files.length !== 0 &&
      this.state.files.length + files.length <= 5
    ) {
      Array.from(files)
        .filter(file => {
          if (file.size > 1024 * 1024 * 5) {
            alert(`${file.name} 파일이 용량이 커서 업로드할 수 없습니다.`);
          } else {
            return true;
          }
        })
        .forEach(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () =>
            this.setState({
              files: this.state.files.concat({
                file,
                preview: reader.result as string,
              }),
            });
        });
      e.target.value = '';
    }
  };

  public removeImage = (i: number) =>
    this.setState({
      files: [
        ...this.state.files.slice(0, i),
        ...this.state.files.slice(i + 1, this.state.files.length),
      ],
    });

  public handleSubmit = () => {
    if (
      this.state.content.trim().length &&
      this.props.postBoardStatus !== 'pending'
    ) {
      this.props.postBoard({
        accessToken: this.props.accessToken,
        content: this.state.content.trim(),
        files: this.state.files.map(v => v.file),
        anonymous: this.state.type,
      });
    }
  };

  public handleFormType = () => {
    this.setState(
      (state: {
        content: string;
        files: Array<{ file: File; preview: string }>;
        textAreaHeight: number;
        type: boolean;
      }) => ({
        type: !state.type,
      }),
    );
    console.log(this.state.type);
  };

  public render() {
    const FormPreviews = Array(5)
      .fill(null)
      .map((_, i) => {
        const file = this.state.files[i];

        if (file) {
          return (
            <FormPreviewWrapper src={file.preview} key={i}>
              <FormPreviewButton onClick={() => this.removeImage(i)} />
            </FormPreviewWrapper>
          );
        } else {
          return (
            <FormImageEmpty htmlFor="files" key={i}>
              <FormImageEmptyPlus />
            </FormImageEmpty>
          );
        }
      });

    return (
      <>
        {this.props.userType === 'student' ||
        this.props.userType === 'graduate' ? (
          <FormWrapper>
            <FormTitle>
              <span>대나무숲에 글 올리기</span>
              <FormType onClick={this.handleFormType} checked={this.state.type}>
                <span>익명</span>
                <img
                  src={this.state.type ? BlueCheck : GreyCheck}
                  alt="form type"
                />
              </FormType>
            </FormTitle>
            <FormContentWrapper>
              <FormBody>
                <ProfileImg
                  image={!this.state.type && !!this.props.userImage}
                  src={
                    !this.state.type
                      ? this.props.userImage || DefaultProfileImage
                      : DefaultProfileImage
                  }
                  alt=""
                />
                <FormBodyText
                  onChange={this.handleContent}
                  value={this.state.content}
                  height={this.state.textAreaHeight}
                  placeholder="대나무숲에 글을 남겨보세요!"
                />
                <FormTypeMobile
                  onClick={this.handleFormType}
                  checked={this.state.type}
                >
                  <span>익명</span>
                  <img
                    src={this.state.type ? BlueCheck : GreyCheck}
                    alt="form type"
                  />
                </FormTypeMobile>
              </FormBody>
              <FormImageWrapper>{FormPreviews}</FormImageWrapper>
              <FormButtonWrapper>
                <div>
                  <FormImgLabel htmlFor="files">사진 추가</FormImgLabel>
                  <input
                    id="files"
                    multiple={true}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.handleFile}
                    accept="image/jpeg,image/x-png"
                  />
                </div>
                <FormSubmitButton
                  onClick={this.handleSubmit}
                  disabled={this.props.postBoardStatus === 'pending'}
                  pending={this.props.postBoardStatus === 'pending'}
                >
                  작성
                </FormSubmitButton>
              </FormButtonWrapper>
            </FormContentWrapper>
          </FormWrapper>
        ) : (
          <></>
        )}
      </>
    );
  }
}
