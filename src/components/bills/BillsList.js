import { useSelector, useDispatch } from 'react-redux'
import { startDeleteBill } from '../../actions/billsAction'
import BillItem from './BillItem'

const BillsList = (props) => {
    const { handleModal } = props

    const dispatch = useDispatch() 
    const  { bills } = useSelector((state) => {
        return state.bill
    })
    
    const removeBill = (id) => {
        dispatch(startDeleteBill(id))
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <h3>Listing Bills - { bills.length }</h3>
                </div>
                <div className="col-md-4">
                    <input type="text" placeholder="search customer" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <button style={{float: 'right'}} onClick={handleModal}>Add new bill</button> 
                </div> 
            </div>
            <div className="row">
                {bills.length > 0 &&
                    bills.map(bill => {
                        return <BillItem key={bill._id} {...bill} removeBill={removeBill} />
                    })
                }

            </div>


        </>
    )
}

export default BillsList