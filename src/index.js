import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startGetBills } from './actions/billsAction';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import { startGetUserProfile } from './actions/userAction'

const store = configureStore()
const token = localStorage.getItem('token')

if(token){
    store.dispatch(startGetCustomers())
    store.dispatch(startGetProducts())
    store.dispatch(startGetBills())
    store.dispatch(startGetUserProfile())
}

store.subscribe(() => store.getState())

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
