import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startGetBills } from '../../actions/billsAction';
import { startGetCustomers } from '../../actions/customersAction';
import { startGetProducts } from '../../actions/productsAction';
import { startGetUserProfile } from '../../actions/userAction'
import Stats from './Stats'
import Bar from './Bar'
import TopStat from './TopStat'

const DashboardContainer = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(startGetCustomers())
        dispatch(startGetProducts())
        dispatch(startGetBills())
        dispatch(startGetUserProfile())
    },[])

    const { customers } = useSelector((state) => {
        return state.customer
    })

    const { products } = useSelector((state) => {
        return state.product
    })

    const { bills } = useSelector((state) => {
        return state.bill 
    })

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