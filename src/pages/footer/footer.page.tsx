import * as React from 'react';

import HatLogoSvg from 'lib/svg/college-graduation.svg';
import FbLogoSvg from 'lib/svg/facebook-logo-button.svg';
import IgLogoSvg from 'lib/svg/instagram.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 10rem;
  background-color: #f9f9f9;
  font-size: 0.7rem;
`;

const WordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Spoqa Han Sans';
  justify-content: space-between;
  height: 7rem;
`;

const TextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RulesWrapper = styled.div`
  width: 11.5rem;
  display: flex;
  justify-content: space-between;
`;

const Rules = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;

const LinksWrapper = styled.div`
  width: 23.5rem;
  display: flex;
  justify-content: space-between;
`;

const LinkBtn = styled.img`
  width: 3rem;
  height: 3.125rem;
`;

const Text = styled.span`
  font-family: 'Spoqa Han Sans';
`;

const FooterPage: React.FC = () => {
  return (
    <FooterWrapper>
      <WordsWrapper>
        <TextsWrapper>
          <Text>[04129] 서울특별시 마포구 마포대로 11길 44-80</Text>
          <Text>한세사이버보안고등학교 총학생회 한울</Text>
        </TextsWrapper>
        <Text>E-Mail : stucon.hansei@gmail.com</Text>
        <RulesWrapper>
          <Rules to="/service/termsofuse">[이용약관]</Rules>
          <Rules to="/service/privacypolicy">[개인정보처리방침]</Rules>
        </RulesWrapper>
        <Text>
          Copyright COPYRIGHT HANSEI CYBER SRCURITY HIGHSCHOOL. ALL RIGHT
          REVERSED
        </Text>
      </WordsWrapper>
      <LinksWrapper>
        <Link to="a">
          <LinkBtn
            style={{ width: '38px', height: '38px' }}
            src={FbLogoSvg}
            alt="facebook logo"
            onClick={() =>
              window.open('https://web.facebook.com/pg/한빛-176560256619015/')
            }
          />
        </Link>
        <Link to="a">
          <LinkBtn
            style={{ width: '38px', height: '38px' }}
            src={IgLogoSvg}
            alt="Instagram logo"
            onClick={() => window.open('https://www.instagram.com/awes_____/')}
          />
        </Link>
        <Link to="a">
          <LinkBtn
            style={{ width: '38px', height: '30px' }}
            src={HatLogoSvg}
            alt="Hat logo"
            onClick={() => window.open('https://github.com/hanlight')}
          />
        </Link>
      </LinksWrapper>
    </FooterWrapper>
  );
};

export default FooterPage;
