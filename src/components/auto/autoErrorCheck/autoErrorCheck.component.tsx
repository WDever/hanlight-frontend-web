import * as React from 'react';

import { AutoErrorCheckProps } from 'container/auto/autoErrorCheck/autoErrorCheck.container';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';

const { useEffect } = React;

const AutoErrorCheckComponent: React.FC<
  AutoErrorCheckProps & RouteComponentProps
> = ({ history, location, onError, code, message, time }) => {
  useEffect(() => {
    if (onError && time) {
      if (!code && moment().unix() - time >= 5000) {
        alert(message);
      } else if (
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
