const getSortedResult = (data, key, sortBy) => {
    let result = []
    if(key === 'customers'){
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
    console.log(result)
    return result
}

export default getSortedResult