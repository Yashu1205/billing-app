//sort for customers and products, sort customers by name/ sort products by name and price 
const getSortedResult = (data, key) => {
    let result = []
    if(key === 'name'){
        result = data.sort((a,b) => {
                    const aName =  a.name.toLowerCase(),   bName = b.name.toLowerCase()

                    if(aName < bName){
                        return -1
                    }
                    if(aName > bName){
                        return 1
                    }
                    return 0
                })
    }
    else{
        result = data.sort((a,b) => a.price - b.price)
    }
    return result
}

export default getSortedResult