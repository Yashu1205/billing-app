//get customer name provided customer id
export const getCustomerName = (customers, customerId) => {
    const result = customers.find(customer => customer._id === customerId)
    return result ? result : 'deleted customer'
} 

//get product name provided product id
export const getProductName = (products, productId) => {
    const result = products.find(product => product._id === productId)
    return result ? result : 'deleted product'
} 