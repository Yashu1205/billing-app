import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetCustomers } from '../../actions/customersAction'
import CustomersList from './CustomersList'

const CustomersContainer = (props) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(startGetCustomers())
    // },[])


    return (
        <div className="container mt-3">
            <CustomersList />
        </div>
    )
}

export default CustomersContainer