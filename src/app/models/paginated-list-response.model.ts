export interface PaginatedListResponse<T> {
    totalCount: number;
    appliances: Array<T>;
}