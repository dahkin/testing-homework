import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './app/styles.css';

import { store } from '@app/store';
import { initializeAPI } from '@app/api';
import { App } from '@app/components/App/App';

initializeAPI();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
