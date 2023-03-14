import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function ToDoList() {
  // Estado para almacenar las tareas y su estado de "isHovering"
  const [ToDos, setToDos] = useState([]);
  // Estado para almacenar el valor del campo de entrada de nueva tarea
  const [newToDo, setNewToDo] = useState("");

  // Función que se ejecuta cuando se cambia el valor del campo de entrada de nueva tarea
  function handleNewToDoChange(event) {
    setNewToDo(event.target.value);
  }

  // Función que se ejecuta cuando se agrega una nueva tarea
  function handleNewToDoAdd() {
    if (newToDo.trim() !== "") {
      const newToDoObj = { id: Date.now(), text: newToDo, isHovering: false };  // genera un identificador único para cada tarea que se agrega a la lista.
      // Agrega la nueva tarea al estado de tareas
      setToDos([...ToDos, newToDoObj]);
      // Borra el valor del campo de entrada de nueva tarea
      setNewToDo("");
    }
  }

  // Función que se ejecuta cuando se elimina una tarea
  function handleToDoDelete(id) {
    // Filtra la tarea con el ID dado y actualiza el estado de tareas
    setToDos(ToDos.filter((ToDo) => ToDo.id !== id));
  }

  // Función que se ejecuta cuando el cursor entra o sale de una tarea
  function handleToDoHover(id, isHovering) {
    // Actualiza el estado de la tarea con el ID dado para indicar si el cursor está encima o no
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

  // Función que se ejecuta cuando se presiona la tecla Enter en el campo de entrada de nueva tarea
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleNewToDoAdd();
    }
  }

  return (
    <div className="container col-md-5 justify-content-center">
      <h1 className="text-center">ToDos List</h1>
      <div className="list">
        {/* Mapea cada tarea en el estado de tareas y crea un elemento de lista para cada una */}
        {ToDos.map((ToDo) => (
          <div
            key={ToDo.id}
            className="d-flex padding align-items-center justify-content-between border"
            onMouseEnter={() => handleToDoHover(ToDo.id, true)}
            onMouseLeave={() => handleToDoHover(ToDo.id, false)}
          >
            <span>{ToDo.text}</span>
            {/* Si el cursor está encima de la tarea, muestra el botón de eliminar */}
            {ToDo.isHovering && (
              <button
                className="eliminar"
                onClick={() => handleToDoDelete(ToDo.id)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* Campo de entrada de nueva tarea */}
        <input
          type="text"
          className="form-control"
          placeholder="Add task"
          value={newToDo}
          onChange={handleNewToDoChange}
          onKeyDown={handleKeyDown}
        />
        {/* Contador de tareas pendientes */}
        <div className="items">
          <p>{ToDos.length} Items left</p>
        </div>
      </div>
    </div>
  );
}
export default ToDoList;
