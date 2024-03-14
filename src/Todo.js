import React, { useState } from "react";
import "./todo.css";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  const deleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };
  const editTodo = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };
  const updateTodo = () => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updateTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue("");
  };
  return (
    <div className="todo-container">
      <h2 className="text-info">ToDo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updateTodo} className="btn btn-danger m-2">
            update
          </button>
        </div>
      ) : (
        <button onClick={addTodo} className="btn btn-primary m-2">
          Add
        </button>
      )}
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="text-white">
              {todo.text}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-primary m-2 "
              >
                Delete
              </button>
              <button
                onClick={() => editTodo(todo.id, todo.text)}
                className="btn btn-primary m-2 "
              >
                Edit
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
