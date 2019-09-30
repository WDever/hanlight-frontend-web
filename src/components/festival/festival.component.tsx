import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Location } from 'history';
import { usePrevious } from 'lib/hooks';
import { AppState, FestivalModel } from 'store';
import ChargeComponent from './charge';
import FSMainComponent from './main';
import FSModalComponent from './modal';
import PayComponent from './pay';

const { useEffect, useState } = React;

const FestivalComponent: React.FC<
  RouteComponentProps<{}, {}, { pay: boolean }>
> = ({ location, history }) => {
  const prevLocation = usePrevious({ location });
  const [locationState, setLocaionState] = useState<Location>(location);
  const [payPageStatus, setPayPageStatus] = useState<boolean>(false);
  const { modalData } = useSelector<AppState, FestivalModel>(
    state => state.festival,
  );

  useEffect(() => {
    if (prevLocation && location.state && location.state.pay) {
      setLocaionState(prevLocation.location);
      setPayPageStatus(true);
    } else {
      setLocaionState(location);
      setPayPageStatus(false);
    }
  }, [location, history]);

  return (
    <>
      {modalData.status && <FSModalComponent />}
      <Switch location={locationState}>
        <Route
          exact={true}
          path="/festival"
          render={() => <FSMainComponent payStatus={payPageStatus} />}
        />
        {payPageStatus && (
          <>
            <Route path="/festival/pay" />
            <Route path="/festival/charge" />
          </>
        )}
        <Redirect to="/error" />
      </Switch>
      {payPageStatus && (
        <>
          <Route path="/festival/pay" component={PayComponent} />
          <Route path="/festival/charge" component={ChargeComponent} />
        </>
      )}
    </>
  );
};

export default FestivalComponent;
