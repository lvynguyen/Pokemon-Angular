export interface PaginatedGenration {
    count: number;
    next: string;
    previous: string;
    results: Generation[];
}

export interface Generation {
    name: string,
    url: string,
}