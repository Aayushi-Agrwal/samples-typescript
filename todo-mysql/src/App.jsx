import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import "./App.css";
import { ReactComponent as EditIcon } from "./pen-solid.svg";
import { ReactComponent as DeleteIcon } from "./trash-solid.svg";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(-1);
  const [editable, setEditable] = useState(-1);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
    setOpenEdit(-1);
  }

  function editItem(id) {
    setEditable(id);
  }

  function saveEdit(id, newValue) {
    const newItems = [...items];
    newItems[id] = newValue;
    setItems(newItems);
  }

  return (
    <div className="container" onClick={() => setOpenEdit(-1)}>
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <div style={{ padding: "1rem" }}>
              {openEdit == index && (
                <div className="editBox" onClick={(e) => e.stopPropagation()}>
                  <ul className="editBoxList">
                    <li
                      className="editBoxListItem"
                      onClick={() => editItem(index)}
                    >
                      <EditIcon
                        style={{
                          height: "1rem",
                        }}
                      />
                      Edit
                    </li>

                    <li
                      className="editBoxListItem"
                      onClick={() => deleteItem(index)}
                    >
                      <DeleteIcon
                        style={{
                          height: "1rem",
                        }}
                      />
                      Delete
                    </li>
                  </ul>
                </div>
              )}
              {editable === index ? (
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={todoItem}
                    onChange={(e) => {
                      saveEdit(index, e.target.value);
                    }}
                  />
                  <li
                    className="editBoxListItem"
                    onClick={() => setEditable(-1)}
                  >
                    {/* <EditIcon
                        style={{
                          height: "1rem",
                        }}
                      /> */}
                    Save
                  </li>
                </div>
              ) : (
                <ToDoItem
                  key={index}
                  id={index}
                  text={todoItem}
                  // onChecked={deleteItem}
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                />
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
