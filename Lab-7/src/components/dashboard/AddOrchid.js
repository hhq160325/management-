import React from "react";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Dashboard.scss";
import { toast } from "react-toastify";

function AddOrchid() {
  const navigate = useNavigate();
  const baseUrl = "https://6677a9ef145714a1bd754da3.mockapi.io/orchid";

  const validationSchema = yup.object().shape({
    id: yup.string().required("ID is required"),
    name: yup
      .string()
      .max(30, "Name must be at most 30 characters")
      .required("Name is required"),
    rating: yup
      .number()
      .min(0, "Rating must be a positive number")
      .required("Rating is required"),
    isSpecial: yup.boolean().required("isSpecial is required"),
    image: yup.string().required("Image URL is required"),
    color: yup.string().required("Color is required"),
    origin: yup.string().required("Origin is required"),
    category: yup.string().required("Category is required"),
    habitat: yup.string().required("Habitat is required"),
    description: yup.string().required("Description is required"),
    videoUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Video URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      rating: 0,
      isSpecial: false,
      image: "",
      color: "",
      origin: "",
      category: "",
      habitat: "",
      description: "",
      videoUrl: "https://www.youtube.com/embed/Bj9nvQR_uFY?si=msu4oqiMB6SI_o8N",
    },
    validationSchema,
    onSubmit: (values) => {
      const orchid = {
        id: values.id,
        name: values.name,
        rating: values.rating,
        isSpecial: values.isSpecial,
        image: values.image,
        color: values.color,
        origin: values.origin,
        category: values.category,
        habitat: values.habitat,
        description: values.description,
        videoUrl: values.videoUrl,
      };
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orchid),
      })
        .then((res) => {
          toast.success("Orchid added successfully!");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  return (
    <form className="add-container" onSubmit={formik.handleSubmit}>
      <div className="add-form">
        <div className="form-title">
          <h2>Add New Orchid</h2>
        </div>
        <div className="form-body">
          <div className="form-group">
            <TextField
              fullWidth
              id="id"
              label="ID"
              variant="filled"
              value={formik.values.id}
              onChange={formik.handleChange}
              name="id"
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="rating"
              label="Rating"
              variant="filled"
              type="number"
              value={formik.values.rating}
              onChange={formik.handleChange}
              name="rating"
              error={formik.touched.rating && Boolean(formik.errors.rating)}
              helperText={formik.touched.rating && formik.errors.rating}
            />
          </div>
          <div className="form-group">
            <FormControlLabel
              control={
                <Checkbox
                  id="isSpecial"
                  name="isSpecial"
                  checked={formik.values.isSpecial}
                  onChange={formik.handleChange}
                />
              }
              label="Is Special?"
            />
            {formik.touched.isSpecial && formik.errors.isSpecial && (
              <div className="error">{formik.errors.isSpecial}</div>
            )}
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="image"
              label="Image URL"
              variant="filled"
              value={formik.values.image}
              onChange={formik.handleChange}
              name="image"
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="color"
              label="Color"
              variant="filled"
              value={formik.values.color}
              onChange={formik.handleChange}
              name="color"
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="origin"
              label="Origin"
              variant="filled"
              value={formik.values.origin}
              onChange={formik.handleChange}
              name="origin"
              error={formik.touched.origin && Boolean(formik.errors.origin)}
              helperText={formik.touched.origin && formik.errors.origin}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="category"
              label="Category"
              variant="filled"
              value={formik.values.category}
              onChange={formik.handleChange}
              name="category"
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="habitat"
              label="Habitat"
              variant="filled"
              value={formik.values.habitat}
              onChange={formik.handleChange}
              name="habitat"
              error={formik.touched.habitat && Boolean(formik.errors.habitat)}
              helperText={formik.touched.habitat && formik.errors.habitat}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="description"
              label="Description"
              variant="filled"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="videoUrl"
              label="Video URL"
              variant="filled"
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              name="videoUrl"
              error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
              helperText={formik.touched.videoUrl && formik.errors.videoUrl}
            />
          </div>
          <div className="form-group">
            <div className="save-btn">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.isValid}
              >
                Save
              </Button>
            </div>
            <div className="cancel-btn">
              <Link to="/dashboard">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => toast.warning("Cancelled creating orchid!")}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddOrchid;
