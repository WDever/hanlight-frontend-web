import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import { configureStore } from 'store';

const store = configureStore;

const Root: React.FC<{}> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;
