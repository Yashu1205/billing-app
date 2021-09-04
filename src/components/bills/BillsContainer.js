import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startGetBills } from '../../actions/billsAction'
import AddBill from './AddBill'
import BillsList from './BillsList'

const BillsContainer = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetBills())
    },[])


    return (
        <div className="container mt-3">
            <BillsList />
        </div>
    )
}

export default BillsContainer