import '../../styles/navbar.css'
import BillsList from './BillsList'

const BillsContainer = (props) => {

    return (
        <div className="container item-container">
            <BillsList />
        </div>
    )
}

export default BillsContainer