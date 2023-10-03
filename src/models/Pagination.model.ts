interface PagingData<T> {
  list: T[];
  total: number;
}

interface pagingEvent {
  page: number;
  limit: number;
}
