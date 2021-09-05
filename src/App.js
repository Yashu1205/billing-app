import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGetBills } from './actions/billsAction';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

    window.onload = function(){
      if(token){
        dispatch(startGetCustomers())
        dispatch(startGetProducts())
        dispatch(startGetBills())
      }
    }

  return (      
      <NavBar/>
  );
}

export default App;
