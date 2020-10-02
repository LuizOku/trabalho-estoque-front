import React from 'react';
import Routes from './routes/routes';
import GlobalStyle from './styles/global.css';
import { ToastProvider } from 'react-toast-notifications';


const App = () => (
  <ToastProvider placement="bottom-right">
    <Routes />
    <GlobalStyle />
  </ToastProvider>
);

export default App;