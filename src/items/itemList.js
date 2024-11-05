import React from "react";
import LineItem from "./lineItem";

const itemList = ({ item, handleCheck, handleDelete }) => {
  return (
    <ul style={{ paddingLeft: 0 }}>
      {item.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          aria-label={`Delete ${item.item}`}
        />
      ))}
    </ul>
  );
};

export default itemList;
