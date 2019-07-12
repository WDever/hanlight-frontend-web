import * as React from 'react';

import { Button, Device } from 'lib/styles';
import CheckBoxSvg from 'lib/svg/checkbox.svg';
import styled from 'styled-components';

interface ModalRecoveryProps {
  type: 'id' | 'password';
  id?: string;
  click(): void;
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Device.tabletL} {
    width: 80%;
  }
  @media ${Device.tabletS} {
    width: 90%;
  }
`;

const Img = styled.img`
  width: 3rem;
  margin-top: 3.875rem;
  margin-bottom: 3.125rem;

  @media ${Device.tabletL} {
    margin-top: 3.5rem;
    margin-bottom: 2.7rem;
  }
  @media ${Device.mobileL} {
    width: 2.3rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 3.75rem;
  font-family: 'Spoqa Han Sans';
  font-size: 1.75rem;
  font-weight: bold;
  color: #000000;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.25rem;
  }
`;

const ColoredText = styled.span`
  color: #4470ff;
`;

const ConfirmBtn = styled(Button)`
  width: 28.75rem;
  max-width: unset;
  height: 4.375rem;
  padding: 0;
  margin: 0;
  margin-left: 10.75rem;
  margin-right: 10.75rem;
  margin-bottom: 3.875rem;

  @media ${Device.tabletL} {
    width: 80%;
    max-width: 28.75rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 3rem;
  }
`;

const ModalRecovery: React.FC<ModalRecoveryProps> = ({ id, click, type }) => {
  return (
    <Wrapper>
      <Modal>
        <Img src={CheckBoxSvg} alt="" />
        <>
          {type === 'id' ? (
            <TextWrapper>
              <span>아이디는&ensp;</span>
              <ColoredText>{id}&ensp;</ColoredText>
              <span>입니다.</span>
            </TextWrapper>
          ) : (
            <TextWrapper>
              <span>비밀번호가&ensp;</span>
              <ColoredText>변경</ColoredText>
              <span>되었습니다.</span>
            </TextWrapper>
          )}
        </>
        <ConfirmBtn onClick={click} active={true}>
          확인
        </ConfirmBtn>
      </Modal>
    </Wrapper>
  );
};

export default ModalRecovery;
