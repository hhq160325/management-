import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Update = ({ onUpdate }) => {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    isSpecial: false,
    image: "",
    color: "",
    origin: "",
    category: "",
    habitat: "",
    description: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://6677a9ef145714a1bd754da3.mockapi.io/orchild/${id}`,
        formData
      );
      onUpdate();
      setId("");
      setFormData({
        name: "",
        rating: "",
        isSpecial: false,
        image: "",
        color: "",
        origin: "",
        category: "",
        habitat: "",
        description: "",
        videoUrl: "",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Is Special:
          <input
            type="checkbox"
            name="isSpecial"
            checked={formData.isSpecial}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Origin:
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Habitat:
          <input
            type="text"
            name="habitat"
            value={formData.habitat}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Video URL:
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update Orchid</button>
    </form>
  );
};

export default Update;
