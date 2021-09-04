const formatDataForPagination = (pageNumber, perPage) => {
    const newEndIndex = pageNumber * perPage;
    const newStartIndex = newEndIndex - perPage;

    return {
        startIndex: newStartIndex,
        endIndex: newEndIndex
    }
}

export default formatDataForPagination