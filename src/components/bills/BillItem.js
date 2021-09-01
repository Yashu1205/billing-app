import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Swal from 'sweetalert2'

const CustomerItem = (props) => {
    const [showEditForm, setShowEditForm] = useState(false)
    const { _id, customer, date, lineItems, total } = props

    
    const { customers } = useSelector((state) => {
        return state.customer
    })

    const customerName = customers.find(cust => cust._id === customer).name

    // const handleRemoveCustomer = () => {
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, cancel!',
    //         })
    //        .then((result) => {
    //             if (result.isConfirmed) {
    //                 removeCustomer(_id)
    //             }
    //        })
    // }
    
    return (
        <div className="card mb-3 p-1">
            <p>{customerName} - {date} - {total} 
                <button className="btn btn-sm btn-danger">Delete</button>
                <button className="btn btn-sm btn-info" >Edit</button>
            </p>
        </div>
    )
}

export default CustomerItem