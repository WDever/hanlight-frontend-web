import * as React from 'react';

import { AutoErrorCheckProps } from 'container/auto/autoErrorCheck/autoErrorCheck.container';
import { RouteComponentProps } from 'react-router';

const { useEffect } = React;

const AutoErrorCheckComponent: React.FC<
  AutoErrorCheckProps & RouteComponentProps
> = ({ history, location, onError, code, message, name }) => {
  useEffect(() => {
    if (onError) {
      if (!code) {
        alert(message);
      } else if (
        code === 403 ||
        (!location.pathname.includes('/board') && code === 404) ||
        code >= 500
      ) {
        history.push('/error');
      }
    }
  }, [onError, code, message, name]);

  return <></>;
};

export default AutoErrorCheckComponent;
