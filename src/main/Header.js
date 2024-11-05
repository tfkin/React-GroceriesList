import React from "react";

const header = ({ title }) => {
  return (
    <header>
      <h1 style={{ margin: "0 auto" }}>{title}</h1>
    </header>
  );
};

header.defaultProps = {
  title: "Default Title",
};

export default header;
