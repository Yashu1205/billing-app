//return start index and end index for data to be displayed on the page
const formatDataForPagination = (pageNumber, perPage) => {
    const newEndIndex = pageNumber * perPage;
    const newStartIndex = newEndIndex - perPage;

    return {
        startIndex: newStartIndex,
        endIndex: newEndIndex
    }
}

export default formatDataForPagination