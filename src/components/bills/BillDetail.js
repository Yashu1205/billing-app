import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsBoxArrowInDown } from 'react-icons/bs'
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import { startBillDetails } from '../../actions/billsAction'

const BillDetail = (props) => {
    const billId = props.match.params.id
    const dispatch = useDispatch()

    const handleShowBillModal = () => {
        return 'done'
    }
    useEffect(() => {
        dispatch(startBillDetails(billId, handleShowBillModal))
    },[billId])

    
    const { billDetails } = useSelector((state) => {
        return state.bill
    })
    
    const { userAccount } = useSelector((state) => {
        return state.user
    }) 
    const { products } = useSelector((state) => {
        return state.product
    })
    const { customers } = useSelector((state) => {
        return state.customer
    })
    
    const getCustomerName = () => {
        const result = customers.find(cust => cust._id === billDetails.customer)
        return result
    }

    
    const getProductName = (productId) => {
        const result = products.find(prod => prod._id === productId)
        return result ? result.name : 'Deleted Customer'
    }

    const downloadBill = () => {
        const element = document.getElementById('bill-info')
        const opt = {
            margin:       1,
            filename:     `${getCustomerName().name}-bill.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
          };

        html2pdf().set(opt).from(element).save()
    }
    
    return (
        <div className="container mt-3 item-container" >
            {
                Object.keys(billDetails).length > 0 &&
            <>
            <div style={{margin:'10px 0 0 69%'}}>
                <button className="btn btn-sm btn-success" onClick={downloadBill}>
                    <BsBoxArrowInDown size="1.5em"/>
                </button>
            </div>
            <div id="bill-info" className="card mt-3" style={{width:'70%',marginLeft:'5%', backgroundColor:'rgb(217 217 12 / 41%)'}}>
                <div className="card-body " style={{textAlign:'center'}}>
                    <h5 className="card-title">{userAccount.businessName}</h5>
                    <h6>Address: {userAccount.address}</h6>
                    <h6>Email:  {userAccount.email}</h6>
                </div>
                <hr/>
                <div className="d-flex justify-content-between" >
                    <div style={{padding:'0 10px'}}>
                        <p>Customer name: {getCustomerName().name}</p>
                        <p>Mobile: {getCustomerName().mobile}</p>
                    </div>
                    <div style={{padding:'0 10px'}}>
                        <p>Date: {moment(billDetails.date).format('ll')}</p>
                    </div>
                </div>
                <hr/>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Particulars</th>
                            <th>MRP</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            billDetails.lineItems.map((lineItem, index) => {
                                return (
                                    <tr key={lineItem._id}>
                                        <td>{index + 1}</td>
                                        <td>{getProductName(lineItem.product)}</td>
                                        <td>{lineItem.price}</td>
                                        <td>{lineItem.quantity}</td>
                                        <td>{lineItem.subTotal}</td>  
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>{billDetails.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            </>
            }
        </div> 
    )

}

export default BillDetail