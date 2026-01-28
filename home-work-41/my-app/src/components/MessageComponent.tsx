import { use } from "react";
import type { MessageResult } from "../types/todo";

export function MessageComponent({ promise }: { promise: Promise<MessageResult> }) {
    const result = use(promise);

    if (typeof result === "string") {
        return <div>{result}</div>
    }

    return (
        <div>
            <p>UserId: <span>{result.userId}</span></p>
            <p>Id: : <span>{result.id}</span></p>
            <p>Title: <span>{result.title}</span></p>
            <p>Completed: <span>{String(result.completed)}</span></p>
        </div>
    );
}