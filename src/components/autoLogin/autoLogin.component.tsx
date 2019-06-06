import * as React from 'react';

import { AutoLoginMethod, AutoLoginProps } from 'container/autoLogin';
import { RouteComponentProps } from 'react-router-dom';

class AutoLoginComponent extends React.Component<
  AutoLoginProps & AutoLoginMethod & RouteComponentProps
> {
  public componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.props.getUser(accessToken);
    } else {
      this.props.history.push('/user/login');
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
