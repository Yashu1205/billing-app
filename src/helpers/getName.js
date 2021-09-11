export const getCustomerName = (customers, customerId) => {
    const result = customers.find(customer => customer._id === customerId)
    return result ? result : 'deleted customer'
} 

export const getProductName = (products, productId) => {
    const result = products.find(product => product._id === productId)
    return result ? result : 'deleted product'
} 