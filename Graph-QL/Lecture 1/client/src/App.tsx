import { gql, useQuery } from "@apollo/client";
import "./App.css";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

function App() {
  const { data, loading } = useQuery<{ getTodos: Todo[] }>(query);

  if (loading) {
    return <div>Loading....</div>;
  }
  
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Todo</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {data?.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user ? todo?.user?.name : "null"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
