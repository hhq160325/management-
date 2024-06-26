import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import Add from "./Add";
import Editorchid from "./EditOrchid";

function Dashboard({ data }) {
  const [orchids, setOrchids] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editOrchid, setEditOrchid] = useState(null);
  const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;
  const confirm = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = () => {
    axios
      .get(baseUrl)
      .then((response) => setOrchids(response.data))
      .catch((error) => console.log(error.message));
  };

  const handleAdd = () => {
    fetchOrchids();
    setShowAddForm(false);
  };

  const handleRemove = (id) => {
    confirm({
      title: `Delete orchid id: ${id}`,
      description: "Are you sure you want to delete this orchid?",
    })
      .then(() => {
        axios
          .delete(`${baseUrl}/${id}`)
          .then(() => {
            toast.success(`Deleted orchid ID: ${id} successfully!`);
            setOrchids((prevOrchids) =>
              prevOrchids.filter((orchid) => orchid.id !== id)
            );
          })
          .catch((error) => {
            toast.error(`Error deleting orchid ID: ${id}: ${error.message}`);
          });
      })
      .catch(() => {
        toast.warning("Cancelled delete operation");
      });
  };

  const handleEditClick = (orchid) => {
    setEditOrchid(orchid);
  };

  const handleEditorchid = () => {
    fetchOrchids();
    setEditOrchid(null);
  };

  return (
    <div>
      {data ? (
        <TableContainer component={Paper} className="dashboard-container">
          <h2 style={{ textAlign: "center", color: "red", fontSize: "50px" }}>
            List of orchids
          </h2>
          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAddForm(true)}
            >
              Show Add Form
            </Button>
          </div>
          <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
            <DialogTitle>Add Orchid</DialogTitle>
            <DialogContent>
              <Add onAdd={handleAdd} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="staff-table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Origin</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orchids.map((orchid) => (
                <TableRow key={orchid.id}>
                  <TableCell align="center">{orchid.id}</TableCell>
                  <TableCell align="center">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={orchid.image}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{orchid.name}</TableCell>
                  <TableCell align="center">{orchid.color}</TableCell>
                  <TableCell align="center">{orchid.origin}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => handleEditClick(orchid)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      className="delete-btn"
                      onClick={() => handleRemove(orchid.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={!!editOrchid} onClose={() => setEditOrchid(null)}>
            <DialogTitle>Edit Orchid</DialogTitle>
            <DialogContent>
              {editOrchid && (
                <Editorchid
                  orchid={editOrchid}
                  onRemove={fetchOrchids}
                  onUpdate={handleEditorchid}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditOrchid(null)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      ) : (
        <div
          style={{ color: "red", textAlign: "center", fontSize: "40px" }}
          className="dashboard-container"
        >
          Please log in to access the dashboard.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
