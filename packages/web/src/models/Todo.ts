
export interface TodoTask {
    id: number;
    name: string;
    description?: string; // if needed
    done: boolean;
    colleteralId?: number;
    startDate?: number; // will be the same as deposit date
    deadline?: number;
    depositAmount: number;
    finishLine?: string;
}

export interface Goal {
    id: number;
    name: string;
    tasks: Array<TodoTask>
    deadline: number;
    achieved: boolean;
}