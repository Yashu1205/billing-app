import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [jwt, setJwt] = useState(token)

    useEffect(() => {
      if(jwt){
        dispatch(startGetProducts())
      }
    },[])

    useEffect(() => { 
      if(jwt){
        dispatch(startGetCustomers())
      } 
    },[])


  return (      
      <NavBar/>
  );
}

export default App;
