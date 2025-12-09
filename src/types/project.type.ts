export interface ProjectRow {
    id: number | string;
    name?: string;
    [key: string]: unknown;
}

export interface Company {
    no: string;
    name: string;
}

export interface Project {
    id: number;
    code: string;
    name: string;
    prefix: number;
    description: string;
    remark: string;
    contract_start_date: string | null;
    contract_end_date: string | null;
    contract_value: string;
    contract_duration: number | null;
    contract_duration_unit: string | null;
    defect_liability_period: number | null;
    defect_liability_period_unit: string | null;
    is_office: number;
    status: string;
    progress_status: string;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
    system_company_id: number;
    area_id: number;
    project_type_id: number;
    parent_project_id: number | null;
    system_company?: { name: string };
    area?: { id: number; name: string };
    project_type?: { id: number; name: string };
}

export interface ProjectListResponse {
    success: boolean;
    data: Project[];
}
