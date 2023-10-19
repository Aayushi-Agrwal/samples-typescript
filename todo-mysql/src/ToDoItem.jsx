import React, { useState } from "react";
import { ReactComponent as DetailsIcon } from "./ellipsis-vertical-solid.svg";

function ToDoItem({ id, text, openEdit, setOpenEdit, onChecked }) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <li>
        <div
          onClick={() => setChecked(!checked)}
          className={checked && "checked"}
        >
          {text}
        </div>
        <div
          onClick={(e) => {
            openEdit === id ? setOpenEdit(-1) : setOpenEdit(id);
            e.stopPropagation();
          }}
          style={{ padding: "0.5rem" }}
        >
          <DetailsIcon
            style={{
              height: "1.2rem",
            }}
          />
        </div>
      </li>
    </div>
  );
}

export default ToDoItem;
