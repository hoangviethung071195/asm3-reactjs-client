import { Pagination as PaginationMui } from '@mui/material';
import { ceil } from 'lodash';
import { PropsWithChildren } from 'react';
import s from './Pagination.module.scss';
import { pagingEvent } from 'models/Pagination.model';

export default function Pagination(props: PropsWithChildren<{
  paging: {
    page: number;
    total: number;
    limit: number;
  };
  onPagingChange: (e: pagingEvent) => void;
}>) {
  const { paging: { page, total, limit }, onPagingChange } = props;
  const pageCount = ceil(total / limit);
  const from = page * pageCount;
  const to = page * pageCount + limit - 1;

  function handleChangePage(event: React.ChangeEvent<unknown>, newPage: number) {
    onPagingChange({ page: newPage, limit });
  };

  return (
    <>
      <PaginationMui
        shape="rounded"
        showFirstButton
        showLastButton
        classes={{
          ul: s['pagination']
        }}
        onChange={handleChangePage}
        count={pageCount}
        page={page}
      />
      {
        page &&
        <p className="text-end text-2 mt-2 me-2">
          showing {from} - {to > total ? total : to} of {total}
        </p>
      }
    </>
  );
}