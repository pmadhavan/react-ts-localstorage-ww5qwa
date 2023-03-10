import * as React from 'react';
import './style.css';
import { nanoid } from 'nanoid';

const initialData = [
  {
    id: nanoid(),
    value: 'Shopping',
    checked: false,
  },
  {
    id: nanoid(),
    value: 'Cooking',
    checked: true,
  },
  {
    id: nanoid(),
    value: 'Haircut',
    checked: false,
  },
  {
    id: nanoid(),
    value: 'Walking',
    checked: false,
  },
];
interface Todo {
  id: string;
  value: string;
  checked: boolean;
}

const ToDoItem = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul>
      {todos &&
        todos.map((todo) => {
          return <li>{todo.value}</li>;
        })}
    </ul>
  );
};
export default function App() {
  const storedItems = JSON.parse(localStorage.getItem('todos'));
  const [todos, setTodos] = React.useState<Todo[]>(storedItems || initialData);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newTodo = {
      value,
      id: nanoid(),
      checked: false,
    };
    setTodos([...todos, newTodo]);
    setValue('');
  };
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="to_do_entry"
          id="to_do"
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          placeholder="Add a to do"
        />
      </form>
      <ToDoItem todos={todos} />
    </div>
  );
}
