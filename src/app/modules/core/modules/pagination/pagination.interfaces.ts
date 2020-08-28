export interface IPagination<T> {
  items: T[];
  total: number;
  totalPage: number;
  currentPage: number;
  limit: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  mapper?: (item) => any;
}
