import * as React from 'react';

import { Buttons } from 'lib/styles';
import checkSvg from 'lib/svg/checkbox.svg';
import phoneCheckFailureSvg from 'lib/svg/phoneCheck-failure.svg';
import phoneCheckSuccessSvg from 'lib/svg/phoneCheck-success.svg';
import styled from 'styled-components';

interface ModalSize {
  width: string;
  height: string;
}

interface ModalProps extends ModalSize {
  type: 'phoneCheck' | 'recoveryId' | 'recoveryPw' | 'error';
  id?: string;
  message?: string;
  click(): void;
}

const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #0000006e;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #000000; */
`;

const ModalWrapper = styled.div<ModalSize>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.16);
`;

const ModalText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 1.75rem;
  font-weight: bold;
`;

const ColoredText = styled.span`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: #4470ff;
`;

const ModalComponent: React.FC<ModalProps> = ({
  width,
  height,
  type,
  id,
  click,
  message,
}) => (
  <Modal>
    <ModalWrapper width={width} height={height}>
      {type === 'phoneCheck' && <img src={phoneCheckSuccessSvg} alt="modal" />}
      {type.includes('recovery') && <img src={checkSvg} alt="modal" />}
      {type === 'error' && (
        <img style={{ width: '5rem' }} src={phoneCheckFailureSvg} alt="modal" />
      )}

      {type === 'phoneCheck' && <ModalText>{message || '인증 성공'}</ModalText>}
      {type === 'recoveryId' && (
        <ModalText>
          아이디는&nbsp;
          <ColoredText>{id}</ColoredText>
          &nbsp; 입니다.
        </ModalText>
      )}
      {type === 'recoveryPw' && (
        <ModalText>
          비밀번호가 &nbsp; <ColoredText>변경</ColoredText>
          되었습니다.
        </ModalText>
      )}
      {type === 'error' && <ModalText>{message || '인증 실패'}</ModalText>}
      <Buttons width="28.75rem" height="4.375rem" active={true} onClick={click}>
        확인
      </Buttons>
    </ModalWrapper>
  </Modal>
);

export default ModalComponent;
