import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationTable = (props) => {
    const { perPage, totalData, handleClick, currentPage } = props
    let pageNumbers = [];
    const totalPages = Math.ceil(totalData / perPage) 

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink
                onClick={() => handleClick(currentPage - 1)}
                previous
                />
            </PaginationItem>

            {pageNumbers.map(i => (
                <PaginationItem key={i} active={currentPage === i ? true : false}>
                <PaginationLink onClick={() => handleClick(i)} >
                    {i}
                </PaginationLink>
                </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                onClick={() => handleClick(currentPage + 1)}
                next
                />
            </PaginationItem>
        </Pagination>
  );
};

export default PaginationTable;
