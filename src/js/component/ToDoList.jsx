import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function ToDoList() {
  const [ToDos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  function handleNewToDoChange(event) {
    setNewToDo(event.target.value);
  }

  function handleNewToDoAdd() {
    if (newToDo.trim() !== "") {
      const newToDoObj = { id: Date.now(), text: newToDo, isHovering: false };
      setToDos([...ToDos, newToDoObj]);
      setNewToDo("");
    }
  }

  function handleToDoDelete(id) {
    setToDos(ToDos.filter((ToDo) => ToDo.id !== id));
  }

  function handleToDoHover(id, isHovering) {
    setToDos(
      ToDos.map((ToDo) => {
        if (ToDo.id === id) {
          return { ...ToDo, isHovering };
        } else {
          return { ...ToDo, isHovering: false };
        }
      })
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleNewToDoAdd();
    }
  }

  return (
    <div className="container col-md-8 justify-content-center">
      <h1 className="text-center">ToDo List</h1>
      <div className="list">
        {ToDos.map((ToDo) => (
          <div
            key={ToDo.id}
            className="d-flex padding align-items-center justify-content-between border"
            onMouseEnter={() => handleToDoHover(ToDo.id, true)}
            onMouseLeave={() => handleToDoHover(ToDo.id, false)}
          >
            <span>{ToDo.text}</span>
            {ToDo.isHovering && (
              <button className="eliminar" onClick={() => handleToDoDelete(ToDo.id)}>
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Presione Enter para agregar una tarea"
          value={newToDo}
          onChange={handleNewToDoChange}
          onKeyDown={handleKeyDown}
        />
        <div className="items">
          <p>{ToDos.length} Items left</p>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
