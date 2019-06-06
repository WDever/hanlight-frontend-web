import HatLogoSvg from 'lib/svg/college-graduation.svg';
import FbLogoSvg from 'lib/svg/facebook-logo-button.svg';
import IgLogoSvg from 'lib/svg/instagram.svg';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 15rem;
  background-color: #f9f9f9;
`;

const WordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
  justify-content: space-between;
  height: 10.75rem;
`;

const RulesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 13.25rem;
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

const FooterComponent: React.FC = () => {
  return (
    <FooterWrapper>
      <WordsWrapper>
        <span>[04129] 서울특별시 마포구 마포대로 11길 44-80</span>
        <span>한세사이버보안고등학교 총학생회 한울</span>
        <span>E-Mail : stucon.hansi@gmail.com</span>
        <RulesWrapper>
          <Rules to="/terms">[이용약관]</Rules>
          <Rules to="privacy">[개인정보처리방침]</Rules>
        </RulesWrapper>
        <span>
          Copyright COPYRIGHT HANSEI CYBER SRCURITY HIGHSCHOOL. ALL RIGHT
          REVERSED
        </span>
      </WordsWrapper>
      <LinksWrapper>
        <Link to="a">
          <LinkBtn src={FbLogoSvg} alt="facebook logo" />
        </Link>
        <Link to="a">
          <LinkBtn src={IgLogoSvg} alt="Instagram logo" />
        </Link>
        <Link to="a">
          <LinkBtn src={HatLogoSvg} alt="Hat logo" />
        </Link>
      </LinksWrapper>
    </FooterWrapper>
  );
};

export default FooterComponent;
