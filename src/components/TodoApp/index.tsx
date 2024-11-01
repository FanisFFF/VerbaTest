import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addTodo,
  deleteTodo,
  deleteAll,
  toggleComplete,
} from "../../store/todoSlice";
import "./todoapp.scss";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoApp: React.FC = () => {
  const [task, setTask] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [mode, setMode] = useState("Все дела");

  const handleAddTask = () => {
    if (task) {
      dispatch(addTodo(task));
      setTask("");
    }
  };
  const handleTasks = () => {
    console.log("bugs");
    if (mode == "Текущие дела") return todos.filter((todo) => !todo.completed);
    if (mode == "Все дела") return todos;
    if (mode == "Выполненные дела")
      return todos.filter((todo) => todo.completed);
    if (mode == "Корзина") return todos.filter((todo) => todo.deleted);
  };
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setMode(e.target.value);
  }
  console.log(todos);
  return (
    <div className="main">
      <div className="header">
        <button onClick={handleAddTask}>+ Добавить</button>
        <input
          placeholder="Пополните список..."
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={() => dispatch(deleteAll())}>Очистить</button>
      </div>

      <div className="tasks">
        <div className="filters">
          <div>
            <label htmlFor="current">Текущие дела</label>
            <input
              id="current"
              onChange={handleChange}
              name="current"
              value="Текущие дела"
              type="radio"
            />
          </div>
          <div>
            <label htmlFor="all">Все дела</label>
            <input
              id="all"
              onChange={handleChange}
              name="current"
              value="Все дела"
              type="radio"
            />
          </div>
          <div>
            <label htmlFor="completed">Выполненные дела</label>
            <input
              id="completed"
              onChange={handleChange}
              name="current"
              value="Выполненные дела"
              type="radio"
            />
          </div>
          <div>
            <label htmlFor="deleted">Корзина</label>
            <input
              id="deleted"
              onChange={handleChange}
              name="current"
              value="Корзина"
              type="radio"
            />
          </div>
        </div>
        {handleTasks()
          // .filter((todo) => !todo.completed)
          // .filter((todo) => !todo.deleted)
          ?.map((todo) => (
            <div className="task" key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => dispatch(toggleComplete(todo.id))}>
                <CheckIcon />
              </button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                <DeleteIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoApp;
