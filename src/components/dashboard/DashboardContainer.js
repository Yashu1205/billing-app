import { useSelector } from 'react-redux'
import Stats from './Stats'
import Bar from './Bar'
import TopStat from './TopStat'

const DashboardContainer = (props) => {

    const { customers } = useSelector((state) => state.customers )
    const { products } = useSelector((state) => state.products )
    const { bills } = useSelector((state) => state.bills )
    console.log(bills)
    console.log(customers)
    return (
        <>
        {bills  &&
            <div className="container item-container">
                <h3 className="mt-3" style={{marginLeft:'10px'}}>Stats</h3>
                <div className="row">
                    <Stats customers={customers} products={products} bills={bills} />
                </div>
                <div className="row">
                    <TopStat customers={customers} products={products} bills={bills}/>
                </div>
                <div className="row">
                    <Bar customers={customers} products={products} bills={bills} />
                </div>
            </div>
        }
        </>
    )
}

export default DashboardContainer