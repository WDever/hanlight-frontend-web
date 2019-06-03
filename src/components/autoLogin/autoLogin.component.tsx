import * as React from 'react';

import { AutoLoginMethod, AutoLoginProps } from 'container/autoLogin';
import { RouteComponentProps } from 'react-router-dom';

class AutoLoginComponent extends React.Component<
  AutoLoginProps & AutoLoginMethod & RouteComponentProps
> {
  public componentDidMount() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      console.log(access_token);
      this.props.getUser(access_token);
    } else {
      this.props.history.push('/auth');
    }
  }

  public componentDidUpdate(
    prevProps: AutoLoginProps & AutoLoginMethod & RouteComponentProps,
  ) {
    if (
      prevProps.getUserStatus === 'pending' &&
      this.props.getUserStatus === 'success'
    ) {
      this.props.history.push('/');
    }
  }

  public render() {
    return <></>;
  }
}

export default AutoLoginComponent;
