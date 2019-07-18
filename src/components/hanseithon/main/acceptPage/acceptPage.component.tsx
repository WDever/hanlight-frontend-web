import * as React from 'react';

import { AcceptPageMethod } from 'container/hanseithon/main/acceptPage';
import { Device } from 'lib/styles';
import TitleImg from 'lib/svg/white-hanlight-title-logo.svg';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const { useState } = React;

const Wrapper = styled.div`
  width: 88%;
  display: flex;
  flex-direction: column;
  color: #ffffff;
`;

const TitleWrapper = styled.div`
  width: 19.1rem;
  font-family: 'Nanum Myeongjo';
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.875rem;

  @media ${Device.tabletL} {
    width: 11.7rem;
    margin-top: 1.5rem;
    align-items: flex-end;
  }

  img {
    width: 6rem;

    @media ${Device.tabletL} {
      width: 4.375rem;
      width: 11.7rem;
      margin-top: 1.5rem;
    }
  }

  span {
    font-family: inherit;
    font-size: 2.25rem;
    font-weight: bold;
    margin-bottom: 5px;
    word-break: keep-all;

    @media ${Device.tabletL} {
      font-size: 17px;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  font-family: 'Open Sans';

  div {
    font-family: inherit;
    font-weight: bold;
    font-size: 1.25rem;
    margin: 2.25rem 0 1rem 0;

    @media ${Device.tabletL} {
      font-size: 0.75rem;
    }
  }

  p {
    font-family: inherit;
    font-size: 1rem;

    @media ${Device.tabletL} {
      font-size: 0.6rem;
    }
  }
`;

const Form = styled.form<{ checked: boolean }>`
  width: 100%;
  margin-top: 1.75rem;
  font-family: 'Open Sans';
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-family: inherit;
    font-size: 1.25rem;
    display: flex;
    align-items: center;

    @media ${Device.tabletL} {
      font-size: 0.75rem;
    }
  }

  button {
    width: 10rem;
    height: 3rem;
    border-radius: 1.75rem;
    background-color: #ef0058;
    outline: none;
    border: none;
    font-size: 1.125rem;
    font-family: inherit;
    color: #ffffff;
    margin-top: 1.5rem;

    @media ${Device.tabletL} {
      width: 7.5rem;
      height: 2rem;
      font-size: 11px;
    }
  }

  input {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.25rem;
    appearance: checkbox;
    margin-left: 0.5rem;

    @media ${Device.tabletL} {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
`;

const AcceptPageComponent: React.FC<RouteComponentProps & AcceptPageMethod> = ({
  history,
  location,
  match,
  deem,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const submitCaution = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deem(false);
    history.push('/hanseithon/join');
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <img src={TitleImg} alt="Accept Title" />
        <span>오빠, 쉬면서 하자</span>
      </TitleWrapper>
      <ContentWrapper>
        <div>행사 숙지 사항</div>
        <p>
          1. 취업맞춤반에 참가하는 학생들로만 구성된 단일팀은 신청이 불가하며,
          반드시 1인 이상 취업맞춤반에 참가하지 않는 학생이 포함되어야 한다.
        </p>
        <p>
          2. 참가 학생 중 취업맞춤반에 참가하는 학생은 팀원에게 양해를 구한 뒤,
          행사 둘 째날에 실시되는 취업맞춤반 수업에 무조건 참석한다. 또한 교육
          시간 중 행사장 출입 시 경고 조치 후, 재발 시 해당 팀은 실격 처리한다.
          (쉬는 시간 출입은 제외)
        </p>
        <p>
          3. 본 대회에 참가하는 학생들은 특별한 사유를 가지고 스태프에게 양해 를
          구하지 않는 한, 대회장 외부로 외출할 수 없다. 외출할 때에는 명찰을
          반납하고, 휴대폰 을 소지한다.
        </p>
        <p>
          4. 본 대회에 참가하는 학생, 운영진, 교사, 학부모, 멘토단 외 모든 사람
          은 본 대회장 에 출입할 수 없다.
        </p>
        <p>
          5. 본 대회에 참가하는 학생들은 한 시간에 한 번씩 자리에 착석하여 인원
          체크를 받아야 한다. 이 때 팀원 중 무단 외출자가 있음이 확인될 시 1회는
          경고, 2회는 해당 팀 실격 처리한다.
        </p>
        <p>
          6. 제출은 7월 26일 15시 00분까지 소스코드, 발표자료, 실행 파일, 시연
          영상을 한빛 웹 사이트’에 제출하도록 한다. 시간 초과 시, 심사 대상에서
          제외한다.
        </p>
        <p>
          7. 제출 파일이 없는 팀은 전원 차기 한세톤 대회 참가 자격을 잃는다.
        </p>
        <p>
          8. 대회 진행 중 안전에 문제가 되는 행위 혹은 타 팀을 방해하는 행위를
          하면 해당 팀 심사 점수를 감점한다. 이가 반복되거나 큰 문제가 되는
          행위를 했을 경우에는 퇴장 조치한다.
        </p>
        <p>
          9. 야간 시간대에는 스태프와 동행하여 출입을 하며, 최대한 출입을
          자제한다.
        </p>
      </ContentWrapper>
      <Form checked={checked} onSubmit={submitCaution}>
        <label>
          상기 내용을 숙지하였으며, 신청을 진행합니다.
          <input
            onChange={() => setChecked(!checked)}
            type="checkbox"
            checked={checked}
          />
        </label>
        <button disabled={!checked}>다음단계</button>
      </Form>
    </Wrapper>
  );
};

export default withRouter(AcceptPageComponent);
