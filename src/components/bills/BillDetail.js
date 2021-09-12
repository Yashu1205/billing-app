import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsBoxArrowInDown } from 'react-icons/bs'
import html2pdf from 'html2pdf.js'
import { startBillDetails } from '../../actions/billsAction'
import { getCustomerName } from '../../helpers/getName'
import BillPrint from './BillPrint'
const BillDetail = (props) => {
    const billId = props.match.params.id
    const dispatch = useDispatch()

    const handleShowBillModal = () => {
        return 'done'
    }
    useEffect(() => {
        dispatch(startBillDetails(billId, handleShowBillModal))
    },[billId])

    
    const { billDetails } = useSelector((state) => state.bill)    
    const { userAccount } = useSelector((state) => state.user)     
    const { products } = useSelector((state) => state.product)
    const { customers } = useSelector((state) => state.customer)
    
    const customerInfo = getCustomerName(customers, billDetails.customer)
    
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
            <div style={{margin:'10px 25px 0 0', float:'right'}}>
                <button className="btn btn-sm btn-success" onClick={downloadBill}>
                    <BsBoxArrowInDown size="1.5em"/>
                </button>
            </div>
                <BillPrint userAccount={userAccount} 
                           products={products}
                           billDetails={billDetails}
                           customerInfo={customerInfo} />
            
            </>
            }
        </div> 
    )

}

export default BillDetail