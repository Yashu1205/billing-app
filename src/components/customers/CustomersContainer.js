import '../../css/header.css'
import CustomersList from './CustomersList'

const CustomersContainer = (props) => {

    return (
        <div className="container item-container">
            <CustomersList/>
        </div>
    )
}

export default CustomersContainer