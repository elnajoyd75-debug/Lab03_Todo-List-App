import { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleAddTodo = () => {
    const heading = headingInput.trim();

    if (heading) {
      setTodos((currentTodos) => [
        ...currentTodos,
        { heading, lists: [] },
      ]);
      setHeadingInput('');
    }
  };

  const handleAddList = (index) => {
    const list = (listInputs[index] || '').trim();

    if (list) {
      setTodos((currentTodos) => currentTodos.map((todo, todoIndex) => (
        todoIndex === index
          ? { ...todo, lists: [...todo.lists, list] }
          : todo
      )));
      setListInputs((currentInputs) => ({ ...currentInputs, [index]: '' }));
    }
  };

  const handleListInputChange = (index, value) => {
    setListInputs((currentInputs) => ({ ...currentInputs, [index]: value }));
  };

  const handleDeleteTodo = (index) => {
    setTodos((currentTodos) => currentTodos.filter((_, todoIndex) => todoIndex !== index));
    setListInputs((currentInputs) => {
      const nextInputs = { ...currentInputs };
      delete nextInputs[index];
      return nextInputs;
    });
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(event) => setHeadingInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleAddTodo();
            }}
          />
          <button type="button" className="add-list-button" onClick={handleAddTodo}>
            Add Heading
          </button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={`${todo.heading}-${index}`} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button
                type="button"
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete Heading
              </button>
            </div>

            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={`${list}-${listIndex}`} className="todo_inside_list">
                  <p>{list}</p>
                </li>
              ))}
            </ul>

            <div className="add_list">
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                onChange={(event) => handleListInputChange(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleAddList(index);
                }}
              />
              <button type="button" className="add-list-button" onClick={() => handleAddList(index)}>
                Add List
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
