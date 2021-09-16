import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { BsBoxArrowInDown } from 'react-icons/bs'
import html2pdf from 'html2pdf.js'

import BillPrint from './BillPrint'

const ViewBill = (props) => {
    const { billDetails, showBillModal, handleShowBillModal, customerInfo} = props
    
    const { userAccount } = useSelector((state) => state.user) 
    const { products } = useSelector((state) => state.products )

    // download bill
    const downloadBill = () => {
        const element = document.getElementById('bill-info')
        const opt = {
            margin:       1,
            filename:     `${customerInfo.name}-bill.pdf`,
            image:        { type: 'jpeg', quality: 1 },
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
            <BillPrint userAccount={userAccount} 
                       products={products} 
                       billDetails={billDetails}
                       customerInfo={customerInfo}/>
            
            <Modal.Footer>
                <button className="btn btn-secondary btn-sm" onClick={handleShowBillModal} style={{marginRight: '8px'}}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewBill 