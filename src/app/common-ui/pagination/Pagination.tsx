import React from "react";
import PagingRequest from "@/app/common-ui/pagination/types/PagingRequest";
import AnchoredText from "@/app/common-ui/anchored-text/AnchoredText";
import MdiIcon from "@/app/common-ui/icons/MdiIcon";
import '@/app/common-ui/pagination/pagination.sass';
import SelectInput from "@/app/common-ui/select-input/SelectInput";

type PaginationProps = {
  pagingRequest: PagingRequest,
  className?: string,
  totalItems?: number,
  updatePagingRequest: (PagingRequest) => void,
};

const itemsPerPage = [
  {text: 10, value: 10},
  {text: 20, value: 20},
  {text: 30, value: 30}
];

const Pagination: React.FC<PaginationProps> = ({
                                                 pagingRequest,
                                                 className,
                                                 totalItems,
                                                 updatePagingRequest
                                               }) => {
  const maxPage = Math.ceil(totalItems / pagingRequest.pageSize);
  const pageText = `${pagingRequest.pageNumber} of ${maxPage}`;

  const nextPage = () => {
    updatePagingRequest({pageNumber: pagingRequest.pageNumber + 1});
  };

  const previousPage = () => {
    updatePagingRequest({pageNumber: pagingRequest.pageNumber - 1});
  };

  const updateItemsPerPage = (pageSize) => {
    updatePagingRequest({pageSize: pageSize});
  };

  const hasItemPagination = <div className={`pagination-container ${className ? className : ''}`}>
    <SelectInput
      label="Items per page"
      items={itemsPerPage}
      value={pagingRequest.pageSize}
      onChange={updateItemsPerPage}
    />

    <div className="page-navigation">
      <AnchoredText label={pageText}/>
      <MdiIcon icon="mdi-chevron-left" onClick={previousPage} className="clickable" size="large"/>
      <MdiIcon icon="mdi-chevron-right" onClick={nextPage} className="clickable" size="large"/>
    </div>
  </div>;

  return totalItems == 0 ? <div/> : hasItemPagination;
};

export default Pagination;
