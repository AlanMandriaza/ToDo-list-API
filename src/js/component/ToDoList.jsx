import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

function ToDoList() {
  const [ToDos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alan")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setToDos(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  function handleNewToDoChange(event) {
    setNewToDo(event.target.value);
  }

  function handleNewToDoAdd() {
    if (newToDo.trim() !== "") {
      const newToDoObj = { label: newToDo, done: false };
      const updatedToDos = [...ToDos, newToDoObj];
      setToDos(updatedToDos);

      fetch("https://assets.breatheco.de/apis/fake/todos/user/alan", {
        method: "PUT",
        body: JSON.stringify(updatedToDos),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setNewToDo(""))
        .catch((error) => console.error("Error updating tasks:", error));
    }
  }

  function handleToDoDelete(id) {
    const updatedToDos = ToDos.filter((ToDo, index) => index !== id);
    setToDos(updatedToDos);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/alan", {
      method: "PUT",
      body: JSON.stringify(updatedToDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error updating tasks:", error));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleNewToDoAdd();
    }
  }

  function handleClearAll() {
    setToDos([]);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/alan", {
      method: "PUT",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error clearing tasks:", error));
  }

  return (
    <div className="container col-md-5 justify-content-center">
      <h1 className="text-center">ToDos List</h1>
      <div className="list">
        {ToDos.map((ToDo, index) => (
          <div
            key={index}
            className="d-flex padding align-items-center justify-content-between border"
          >
            <span>{ToDo.label}</span>
            <button
              className="eliminar"
              onClick={() => handleToDoDelete(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Add task"
          value={newToDo}
          onChange={handleNewToDoChange}
          onKeyDown={handleKeyDown}
        />
        <div className="items">
          <p>{ToDos.length} Items left</p>
        </div>
        <button className="btn btn-danger" onClick={handleClearAll}>
          Clear All Tasks
        </button>
      </div>
    </div>
  );
}

export default ToDoList;
