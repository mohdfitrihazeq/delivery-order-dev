export interface ProjectRow {
    id: number | string;
    name?: string;
    [key: string]: unknown;
}

export interface Company {
    no: string;
    name: string;
}
