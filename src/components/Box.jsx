import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="boxContainer">
      <button
        className="toggle-btn"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </section>
  );
}
