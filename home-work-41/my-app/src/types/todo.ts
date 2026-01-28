export type UserTodo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
};

export type MessageResult = UserTodo | string;