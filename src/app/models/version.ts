export interface PaginatedVersion {
    count: number;
    next: string;
    previous: string;
    results: Version[];
}

export interface Version {
    name: string,
    url: string
}