import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "./context/authContext";
// We can use Router System by using this module
import { BrowserRouter } from "react-router-dom";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

