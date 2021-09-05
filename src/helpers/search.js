const getSearchResult = (data, query, key) => {
    let result = []
    if(key === 'customers'){
        result = data.filter(customer => {
            return customer.name.toLowerCase().includes(query.toLowerCase()) || 
                    customer.email.toLowerCase().includes(query.toLowerCase()) ||
                    customer.mobile.includes(query)
        })
    }

    else if(key === 'products'){
        result = data.filter(product => product.name.toLowerCase().includes(query.toLowerCase()) )
    }

    return result
}

export default getSearchResult