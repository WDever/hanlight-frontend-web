import * as React from 'react';

import { Device } from 'lib/styles';
import LikeImg from 'lib/svg/like.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 4.0625rem;
  border-bottom: solid 1px #ebebeb;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: 'Spoqa Han Sans';

  @media ${Device.mobileL} {
    height: 2.58rem;
  }

  span {
    width: 18.5rem;

    font-family: inherit;
    font-size: 13px;

    @media ${Device.mobileL} {
      width: 13rem;

      font-size: 0.625rem;

      margin-left: 0.2625rem;
    }
  }
`;

const ProfileImg = styled.div`
  width: 2rem;

  padding: 17.5px 0 15.5px 20px;

  @media ${Device.mobileL} {
    padding: 0.75rem 0 11px 12px;

    width: 1.25rem;
  }

  img {
    width: 100%;

    border-radius: 100%;
    border: 1px solid #d1d1d1;
  }
`;

const LikeWrapper = styled.div`
  width: 3.5rem;
  margin-right: 1.25rem;

  font-family: inherit;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: inherit;
  font-size: 13px;

  @media ${Device.mobileL} {
    width: 3rem;

    font-size: 0.625rem;

    margin-right: 0.75rem;
  }

  img {
    height: 13px;

    @media ${Device.mobileL} {
      height: 0.75rem;
    }
  }
`;

interface LikeListItemProps {
  user_image: string;
  user_name: string;
}

const LikeListItemComponent: React.FC<LikeListItemProps> = ({
  user_image,
  user_name,
}) => {
  return (
    <Wrapper>
      <ProfileImg>
        <img alt="profile" src={user_image} />
      </ProfileImg>
      <span>{user_name}</span>
      <LikeWrapper>
        <img src={LikeImg} alt="like icon" />
        좋아요
      </LikeWrapper>
    </Wrapper>
  );
};

export default LikeListItemComponent;
