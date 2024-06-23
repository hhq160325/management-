import React, { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

function EditOrchid({ data }) {
  const idDetails = useParams();
  const pr = idDetails.id;
  const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;

  useEffect(() => {
    fetch(`${baseUrl}/${pr}`)
      .then((response) => response.json())
      .then((data) => {
        formik.setValues({
          id: data.id,
          image: data.image,
          name: data.name,
          rating: data.rating.toString(),
          isSpecial: data.isSpecial,
          color: data.color,
          origin: data.origin,
          category: data.category,
          habitat: data.habitat,
          description: data.description,
          videoUrl: data.videoUrl,
        });
      })
      .catch((error) => console.log(error.message));
  }, [baseUrl, pr]);

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    image: yup.string().required("Image URL is required"),
    name: yup
      .string()
      .required("Name is required")
      .max(255, "Name must be at most 255 characters"),
    rating: yup
      .number()
      .typeError("Rating must be a number")
      .integer("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .required("Rating is required"),
    isSpecial: yup.boolean().required("Is Special is required"),
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
      image: "",
      name: "",
      rating: "",
      isSpecial: false,
      color: "",
      origin: "",
      category: "",
      habitat: "",
      description: "",
      videoUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const orchid = {
        id: values.id,
        image: values.image,
        name: values.name,
        rating: parseInt(values.rating),
        isSpecial: values.isSpecial,
        color: values.color,
        origin: values.origin,
        category: values.category,
        habitat: values.habitat,
        description: values.description,
        videoUrl: values.videoUrl,
      };
      fetch(`${baseUrl}/${pr}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orchid),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update orchid");
          }
          toast.success(`Update orchid id: ${orchid.id} successful!!`);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Error updating orchid:", err.message);
          toast.error("Failed to update orchid");
        });
    },
  });

  return data ? (
    <form className="edit-container" onSubmit={formik.handleSubmit}>
      <div className="edit-form">
        <div className="form-title">
          <h2>Edit Orchid</h2>
        </div>
        <div className="form-body">
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="ID"
              variant="filled"
              {...formik.getFieldProps("id")}
              disabled
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Image URL"
              variant="filled"
              {...formik.getFieldProps("image")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Name"
              variant="filled"
              {...formik.getFieldProps("name")}
              helperText={formik.errors.name}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Rating"
              variant="filled"
              {...formik.getFieldProps("rating")}
              helperText={formik.errors.rating}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Is Special"
              variant="filled"
              {...formik.getFieldProps("isSpecial")}
              type="checkbox"
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Color"
              variant="filled"
              {...formik.getFieldProps("color")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Origin"
              variant="filled"
              {...formik.getFieldProps("origin")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Category"
              variant="filled"
              {...formik.getFieldProps("category")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Habitat"
              variant="filled"
              {...formik.getFieldProps("habitat")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Description"
              variant="filled"
              {...formik.getFieldProps("description")}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              id="filled-basic"
              label="Video URL"
              variant="filled"
              {...formik.getFieldProps("videoUrl")}
              required
            />
          </div>
          <div className="form-group">
            <div className="update-btn">
              <Button variant="contained" color="success" type="submit">
                Update
              </Button>
            </div>
            <div className="cancel-btn">
              <Link to="/dashboard">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => toast.warning("Cancel update orchid!")}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  ) : null;
}

export default EditOrchid;
