import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { BsBoxArrowInDown } from 'react-icons/bs'
import html2pdf from 'html2pdf.js'
import moment from 'moment'
import { getProductName } from '../../helpers/getName'

const ViewBill = (props) => {
    const { billDetails, showBillModal, handleShowBillModal, customerInfo} = props
    
    const { userAccount } = useSelector((state) => state.user) 
    const { products } = useSelector((state) => state.product)

    const downloadBill = () => {
        const element = document.getElementById('bill-info')
        const opt = {
            margin:       1,
            filename:     `${customerInfo.name}-bill.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
          };

        html2pdf().set(opt).from(element).save()
    }

    return (
        <Modal
            show={showBillModal}
            onHide={handleShowBillModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <div className="w-25" style={{right: '0px', textAlign: 'right',position: 'absolute', margin:'5px 20px'}}>
                <button className="btn btn-primary btn-sm" onClick={downloadBill}>
                    <BsBoxArrowInDown size="1.5em"/>
                </button>
            </div>
            <div id="bill-info" className="card" style={{margin:'50px 20px 0 20px', backgroundColor:'rgb(217 217 12 / 41%)'}}>
                <div className="card-body " style={{textAlign:'center'}}>
                    <h5 className="card-title">{userAccount.businessName}</h5>
                    <h6>Address: {userAccount.address}</h6>
                    <h6>Email:  {userAccount.email}</h6>
                </div>
                <hr/>
                <div className="d-flex justify-content-between" >
                    <div style={{padding:'0 10px'}}>
                        <p>Customer name: {customerInfo.name}</p>
                        <p>Mobile: {customerInfo.mobile}</p>
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
                                        <td>{getProductName(products,lineItem.product).name}</td>
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
            <Modal.Footer>
                <button className="btn btn-secondary btn-sm" onClick={handleShowBillModal} style={{marginRight: '8px'}}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewBill 