export interface IPagination {
  limit?: number;
  offset?: number;
  order?: string;
  page?: number;
  total?: number;
  filter?: IFilter;
}

export interface IFilter {
  filterText?: any;
  properties?: string[];
}
