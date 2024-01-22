import React from "react";
import PagingRequest from "@/components/common-ui/pagination/types/PagingRequest";
import AnchoredText from "@/components/common-ui/anchored-text/AnchoredText";
import MdiIcon from "@/components/common-ui/icons/MdiIcon";
import styles from '@/components/common-ui/pagination/pagination.module.sass';
import SelectInput from "@/components/common-ui/select-input/SelectInput";

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
    if (pagingRequest.pageNumber < maxPage) {
      updatePagingRequest({pageNumber: pagingRequest.pageNumber + 1});
    }
  };

  const previousPage = () => {
    if (pagingRequest.pageNumber > 1) {
      updatePagingRequest({pageNumber: pagingRequest.pageNumber - 1});
    }
  };

  const updateItemsPerPage = (pageSize) => {
    updatePagingRequest({pageSize: pageSize});
  };

  if (totalItems == 0) {
    return <div/>;
  }

  return <div className={`${styles['pagination-container']} ${className ? className : ''}`}>
    <SelectInput
      label="Items per page"
      items={itemsPerPage}
      value={pagingRequest.pageSize}
      onChange={updateItemsPerPage}
    />

    <div className={styles['page-navigation']}>
      <AnchoredText label={pageText}/>
      <MdiIcon icon="mdi-chevron-left" onClick={previousPage} className="clickable" size="large"/>
      <MdiIcon icon="mdi-chevron-right" onClick={nextPage} className="clickable" size="large"/>
    </div>
  </div>;
};

export default Pagination;
