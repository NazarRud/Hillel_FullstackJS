import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export function DataFetcher() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        await wait(1000);
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message || "Сталася помилка під час завантаження.");
        } else {
          setError("Сталася помилка під час завантаження.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Завантаження даних...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <div>
      <h2>Список користувачів</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
