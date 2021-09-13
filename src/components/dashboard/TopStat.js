import moment from 'moment'
import { getCustomerName, getProductName } from '../../helpers/getName'
import lastWeekDays from '../../helpers/lastWeekDays'

const TopStat = (props) => {
    const { customers, products, bills } = props
    
    const lastWeek = lastWeekDays()

    //get bills data from the last week
    const lastWeekSales = bills.filter(bill => {
        return lastWeek.includes(moment(bill.date).format('l'))
    })

    const customersTotalAmount = {}
    const topCustomers = []

    //returns an array of customers with their bill amount
    const allCustomers = lastWeekSales.reduce((accu, current) => {
        return accu.concat({id: current.customer, total: current.total})
    },[])   

    //get total bill amount of each customer for the last week
    allCustomers.forEach(cust => {
        if(customersTotalAmount.hasOwnProperty(cust.id)){
            customersTotalAmount[cust.id] += cust.total
        }
        else{
            customersTotalAmount[cust.id] = cust.total
        }    
    })

    //make array of customers with their total amount so that it is easy to sort 
    for(const ele in customersTotalAmount){
        topCustomers.push({id: ele, total: customersTotalAmount[ele]})
    }
    //sort the array of customers on the basis of the total bill amount and return top 5 customers
    const topFiveCustomers = topCustomers.sort((a,b) => b.total - a.total).slice(0,5)
    
    const topProducts = []
    const productsCount = {}
    
    // returns an array of all bought products in the last week 
    const allBoughtProducts = lastWeekSales.reduce((accu, current) => {
        return accu.concat(current.lineItems)
    },[])

    //add each purcahsed product in the productsCount object with its id and total purchased quantity
    allBoughtProducts.forEach(prod => {
        if(productsCount.hasOwnProperty(prod.product)){
            productsCount[prod.product] += prod.quantity
        }
        else{
            productsCount[prod.product] = prod.quantity
        }
    })
    //push all values in the productsCount to the topProducts array to make it easier to sort
    for(const ele in productsCount){
        topProducts.push({id: ele, quantity: productsCount[ele]})    
    }    
    //sort the products array based on product quantity and get only the first five products 
    const topFiveProducts  = topProducts.sort((a,b) => b.quantity - a.quantity).slice(0,5)
    
    return (
        <>
        <div className="row">
            <h3 className="mt-3" style={{marginLeft:'10px'}}>This week: Top 5</h3>

        </div>
            <div className="d-flex flex-wrap">
                <div className="card" style={{width:'46%', margin:'10px'}}>
                    <div className="card-body">
                        <h5 className="card-subtitle text-muted">Customers</h5>
                        <table className="table table-bordered table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Bill Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                { topFiveCustomers.map(topSale => {
                                    return (
                                        <tr key={topSale.id}>
                                            <td>{getCustomerName(customers, topSale.id).name}</td>
                                            <td>{topSale.total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card" style={{width:'45%', margin:'10px'}}>
                <div className="card-body">
                        <h5 className="card-subtitle text-muted">Frequently bought products</h5>
                        <table className="table table-bordered table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                { topFiveProducts.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{getProductName(products, item.id).name}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopStat
