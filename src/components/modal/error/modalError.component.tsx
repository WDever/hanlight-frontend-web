import * as React from 'react';

import { Button, Device } from 'lib/styles';
import phoneCheckFailureSvg from 'lib/svg/phoneCheck-failure.svg';
import styled from 'styled-components';

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
`;

const Img = styled.img`
  width: 5rem;
  margin-top: 2.8rem;
  margin-bottom: 3.125rem;

  @media ${Device.tabletS} {
    width: 3.5rem;
  }
  @media ${Device.mobileL} {
    width: 3rem;
    margin-bottom: 1.5rem;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 3.75rem;
  font-family: 'Spoqa Han Sans';
  font-size: 1.75rem;
  font-weight: bold;
  color: #000000;

  @media ${Device.tabletS} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const ConfirmBtn = styled(Button)`
  width: 28.75rem;
  max-width: unset;
  height: 4.375rem;
  padding: 0;
  margin: 0;
  margin-left: 4rem;
  margin-right: 4rem;
  margin-bottom: 2.875rem;

  @media ${Device.tabletL} {
    width: 80%;
    max-width: 28.75rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 3rem;
  }
`;

const ModalError: React.FC<{ message: string; click(): void }> = ({
  message,
  click,
}) => {
  return (
    <Wrapper>
      <Modal>
        <Img src={phoneCheckFailureSvg} alt="" />
        <TextWrapper>{message || '인증 실패'}</TextWrapper>
        <ConfirmBtn active={true} onClick={click}>
          확인
        </ConfirmBtn>
      </Modal>
    </Wrapper>
  );
};

export default ModalError;
