import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <ul className="nav flex-column">
      {items.map((item) => (
        <li className="nav-item" key={item}>
          <a
            onClick={() => onItemSelect(item)}
            href={item}
            className={item === selectedItem ? "nav-link active" : "nav-link"}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
