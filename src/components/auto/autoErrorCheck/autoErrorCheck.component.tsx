import * as React from 'react';

import {
  AutoErrorCheckMethod,
  AutoErrorCheckProps,
} from 'container/auto/autoErrorCheck/autoErrorCheck.container';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';

const { useEffect } = React;

const AutoErrorCheckComponent: React.FC<
  AutoErrorCheckProps & AutoErrorCheckMethod & RouteComponentProps
> = ({ history, location, onError, code, message, time, setError }) => {
  useEffect(() => {
    const isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1;

    if (isIE) {
      setError({
        code: 400,
        message:
          '현재 지원하지 않는 웹 브라우저입니다. 한빛은 많은 호환성을 제공하기 위해 크롬 브라우저를 권장합니다.',
        description: '지원하지 않는 브라우저',
        name: 'NOT SUPPORTED',
      });
    }
  }, []);

  useEffect(() => {
    if (onError && time) {
      if (!code && moment().unix() - time >= 5000) {
        alert(message);
      } else if (
        code === 400 ||
        code === 403 ||
        (!location.pathname.includes('/board') && code === 404) ||
        code >= 500
      ) {
        history.push('/error');
      }
    }
  }, [onError]);

  return <></>;
};

export default AutoErrorCheckComponent;
