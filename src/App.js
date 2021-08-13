import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {

  return (
    <div className="todo-app mt-5">
      <TodoList />
      <TodoForm />
    </div>
  );
}

export default App;
