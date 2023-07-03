import { useState } from "react";
import { Pagination } from "react-bootstrap";
import {Loan} from './UtilsAxios';

type PaginationProps = {
  itemsLenght: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
};
  
export function CustomPagination({ itemsLenght, itemsPerPage, onPageChange }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(itemsLenght / itemsPerPage);
  
    const handleClick = (pageNumber: number) => {
      if(pageNumber>totalPages){
        pageNumber = totalPages;
      }else if (pageNumber<1) {
        pageNumber = 1;
      };
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    };

    
    // TODO TEST ELLIPSIS more than 5 pages - GPT generated snipset
    const paginationItems = [];

    const r = 2;
    let r1 = currentPage - r;
    let r2 = currentPage + r;
  
    if (r1 <= 2) {
      r1 = 2;
      r2 = r1 + 4;
    } else if (r2 >= totalPages - 1) {
      r2 = totalPages - 1;
      r1 = r2 - 4;
    } else if (totalPages > 5) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis" />);
      r1 = currentPage - 1;
      r2 = currentPage + 1;
    }
  
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= r1 && i <= r2)) {
        paginationItems.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => handleClick(i)}>
            {i}
          </Pagination.Item>
        );
      } else if (i === r1 - 1 || i === r2 + 1) {
        paginationItems.push(<Pagination.Ellipsis key="ellipsis" />);
      }
    }
  
    return (
      <Pagination className="mi-paginacion">
        <Pagination.Prev onClick={() => handleClick(currentPage-1)}/>
        {paginationItems}
        <Pagination.Next onClick={() => handleClick(currentPage+1)}/>
      </Pagination>
    );
}