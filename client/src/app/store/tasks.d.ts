export interface TasksState {
    isLoading: boolean;
    totalCount: number;
    tasks: Tasks[];
    curTask?: Tasks;
    tableOptions: TableOptions;
}

export interface TableOptions{
    limit: number;
    offset?: number;
    sort?: string;
    sortOrder?: string;
}

export interface Tasks {
    taskId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: any;
}