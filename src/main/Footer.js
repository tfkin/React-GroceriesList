import React from "react";

function Footer({ length }) {
  return (
    <footer>
      <p>
        List Items: {length} {length === 1 ? "item" : "items"}
      </p>
    </footer>
  );
}

export default Footer;
