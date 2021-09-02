import { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

const BillForm = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [customerId, setCustomerId] = useState('')
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [lineItems, setLineItems ] = useState([])
    const options = [
        {value: 'Select---', label: ''},
        { value: 'Front-End Developer', label: 'Front-End Developer'},
        { value: 'Node.js Developer', label: 'Node.js Developer'},
        { value: 'MEAN Stack Developer', label: 'MEAN Stack Developer' },
        { value: 'FULL Stack Delveloper', label: 'FULL Stack Delveloper'}
    ]

    const { products } = useSelector((state) => {
        return state.product
    })

    const productOptions = products.map((product) => {
        return {value: product._id, label: product.name}
    })
    // const options = [{value: 'Select product', label: ''}, {...productOptions}]

    const { customers } = useSelector(state => {
        return state.customer 
    })

    const handleChange = (e) => {
        console.log(e.target.value)
        const inputName = e.target.name
        if(inputName === "customer"){
            setCustomerId(e.target.value)
        }
    }

    const handleSelectChange = (selectedOption) => {
        console.log(selectedOption)
        setSelectedOption(selectedOption)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCancel = (e) => {
        e.preventDefault()
        // handleFormToggle()
    }

    return (
        <div className="card">
            <div className="card-body">
            <h2>Add Note</h2>

                <form onSubmit={handleSubmit}>

                    <select name="customer" value={customerId} onChange={handleChange} >
                        <option value="">Select customer</option>
                        {
                            customers.map(customer => {
                                return <option key={customer._id} value={customer._id}>{customer.name}</option>
                            })
                        }
                    </select>
                    <br/>
                    <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
      />
                    <button>Add to cart</button><br/>
                    <input type="submit" className="btn btn-primary btn-sm" value="Save" />
                    
                    <button className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}
                                        onClick={handleCancel}>Cancel</button> 
                </form>
            </div>
        </div>
    )
}

export default BillForm