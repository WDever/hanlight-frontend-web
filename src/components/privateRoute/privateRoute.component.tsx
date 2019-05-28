import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteType {
  component: React.ReactElement | React.FunctionComponent | React.Component;
  enter: boolean;
  redirectLocation: string;
}

const PrivateRoute: React.FC<RouteProps & PrivateRouteType> = ({
  component: Component,
  enter,
  redirectLocation,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (enter ? (
      <Component {...props} />
    ) : (
      <Redirect
        // to={{
        //   pathname: redirectLocation,
        //   state: { from: props.location },
        // }}
        to={redirectLocation}
      />
    ))
    }
  />
);

export default PrivateRoute;
