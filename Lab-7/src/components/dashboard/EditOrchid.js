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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
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
      setSuccess(true);
    } catch (error) {
      setError("Error updating data. Please try again.");
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Orchid ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            aria-label="Orchid ID"
          />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Name"
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
            aria-label="Rating"
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
            aria-label="Is Special"
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
            aria-label="Image URL"
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
            aria-label="Color"
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
            aria-label="Origin"
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
            aria-label="Category"
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
            aria-label="Habitat"
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
            aria-label="Description"
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
            aria-label="Video URL"
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Orchid"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Update successful!</p>}
    </form>
  );
};

const Editorchid = ({ onUpdate }) => {
  return (
    <div>
      <h2>Update Orchid</h2>
      <Update onUpdate={onUpdate} />
    </div>
  );
};

export default Editorchid;
