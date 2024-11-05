import React from "react";
import ItemList from "../items/itemList";

function Content({ item, handleCheck, handleDelete }) {
  return (
    <>
      {item.length ? (
        <ItemList
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your List is Empty!</p>
      )}
    </>
  );
}

export default Content;
