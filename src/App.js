import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGetCustomers } from './actions/customersAction';
import { startGetProducts } from './actions/productsAction';
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startGetProducts())
  },[])

  useEffect(() => {  
    dispatch(startGetCustomers())
  },[])


  return (      
      <NavBar/>
  );
}

export default App;
