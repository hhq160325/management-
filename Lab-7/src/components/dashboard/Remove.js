import React, { useState } from "react";
import axios from "axios";

const Remove = ({ onRemove }) => {
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://6677a9ef145714a1bd754da3.mockapi.io/orchild/${id}`
      );
      onRemove();
      setId("");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Orchid ID:
          <input type="text" value={id} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Remove Orchid</button>
    </form>
  );
};

export default Remove;
