import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CssBaseline } from '@mui/material';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* CssBaseline kicks off an elegant, consistent Material UI baseline */}
      <CssBaseline /> 
      <App />
    </Provider>
  </React.StrictMode>,
);