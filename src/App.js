import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGetBills } from './actions/billsAction';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [jwt, setJwt] = useState(token)

    window.onload = function(){
      if(jwt){
        dispatch(startGetCustomers())
        dispatch(startGetProducts())
        dispatch(startGetBills())
      }
    }
    // useEffect(() => {
    // },[])

    // useEffect(() => { 
    // },[])


  return (      
      <NavBar/>
  );
}

export default App;
