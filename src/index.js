import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

// import "./index.css";
import 'antd/dist/antd.css';
import ptBR from 'antd/lib/locale/pt_BR';

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import setupInterceptors from "./services/setupInterceptors";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { ConfigProvider } from "antd";

ReactDOM.render(

  <Provider store={store}>
    <ConfigProvider locale={ptBR}>
      <App />
      <ToastContainer autoClose={3000} />
    </ConfigProvider>
  </Provider>
  ,
  document.getElementById("root")
);

setupInterceptors(store);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
