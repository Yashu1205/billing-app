import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGetBills } from './actions/billsAction';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import { startGetUserProfile } from './actions/UserAction'
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

    window.onload = function(){
      if(token){
        dispatch(startGetCustomers())
        dispatch(startGetProducts())
        dispatch(startGetBills())
        dispatch(startGetUserProfile())
      }
    }

  return (      
      <NavBar/>
  );
}

export default App;
