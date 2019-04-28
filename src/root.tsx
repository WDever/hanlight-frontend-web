import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';

const Root: React.FC<{}> = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
