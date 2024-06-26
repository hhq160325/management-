// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Add from "./Add";
// import Remove from "./Remove";
// import Update from "./Update";
// import Button from "@mui/material/Button";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";

// const Dashboard = () => {
//   const [orchids, setOrchids] = useState([]);
//   const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedOrchid, setSelectedOrchid] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showRemoveForm, setShowRemoveForm] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogContent, setDialogContent] = useState(null);

//   useEffect(() => {
//     fetch(baseUrl)
//       .then((response) => response.json())
//       .then((data) => setOrchids(data))
//       .catch((error) => console.log(error.message));
//   }, []);

//   const handleMenuOpen = (event, orchid) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedOrchid(orchid);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedOrchid(null);
//   };

//   const handleUpdateClick = () => {
//     setDialogContent(<Update onUpdate={handleUpdateOrchid} />);
//     setOpenDialog(true);
//     handleMenuClose();
//   };

//   const handleRemoveClick = () => {
//     setDialogContent(<Remove onRemove={handleRemoveOrchid} />);
//     setOpenDialog(true);
//     handleMenuClose();
//   };

//   const handleAddButtonClick = () => {
//     setDialogContent(<Add onAdd={handleAddOrchid} />);
//     setOpenDialog(true);
//   };

//   const handleRemoveOrchid = async () => {
//     try {
//       await axios.delete(`${baseUrl}/${selectedOrchid.id}`);
//       setOrchids(orchids.filter((orchid) => orchid.id !== selectedOrchid.id));
//       console.log("Successfully removed orchid with ID:", selectedOrchid.id);
//     } catch (error) {
//       console.error("Error removing orchid:", error);
//     } finally {
//       setOpenDialog(false);
//     }
//   };

//   const handleUpdateOrchid = async () => {
//     try {
//       // Fetch updated orchids after successful update
//       const response = await axios.get(baseUrl);
//       setOrchids(response.data);
//       console.log("Successfully updated orchids.");
//     } catch (error) {
//       console.error("Error updating orchids:", error);
//     }
//   };

//   const handleAddOrchid = () => {
//     fetch(baseUrl)
//       .then((response) => response.json())
//       .then((data) => setOrchids(data))
//       .catch((error) => console.log(error.message));
//     setOpenDialog(false);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Orchid Dashboard</h1>

//       <Button variant="contained" onClick={handleAddButtonClick}>
//         Add Orchid
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orchids.map((orchid) => (
//               <TableRow key={orchid.id}>
//                 <TableCell>{orchid.id}</TableCell>
//                 <TableCell>{orchid.name}</TableCell>
//                 <TableCell>
//                   <img
//                     src={orchid.image}
//                     alt={orchid.name}
//                     style={{ maxWidth: "100px" }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     aria-controls="actions-menu"
//                     aria-haspopup="true"
//                     onClick={(event) => handleMenuOpen(event, orchid)}
//                     variant="outlined"
//                   >
//                     Actions
//                   </Button>
//                   <Menu
//                     id="actions-menu"
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={Boolean(anchorEl)}
//                     onClose={handleMenuClose}
//                   >
//                     <MenuItem onClick={handleRemoveClick}>
//                       <IconButton aria-label="delete">
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                       Remove Orchid
//                     </MenuItem>
//                     <MenuItem onClick={handleUpdateClick}>
//                       <IconButton aria-label="update">
//                         <UpdateIcon fontSize="small" />
//                       </IconButton>
//                       Update Orchid
//                     </MenuItem>
//                   </Menu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Form</DialogTitle>
//         <DialogContent>{dialogContent}</DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;
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
import { Button } from "@mui/material";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import Add from "./Add"; // Import Add component
import Remove from "./Remove"; // Import Remove component
import Update from "./Update"; // Import Update component
function Dashboard({ data }) {
  const [orchids, setOrchids] = useState([]);
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
    fetchOrchids(); // Refresh orchid list after adding
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

  const handleUpdate = () => {
    fetchOrchids(); // Refresh orchid list after updating
  };

  return (
    <div>
      {data ? (
        <TableContainer component={Paper} className="dashboard-container">
          <h2 style={{ textAlign: "center", color: "red", fontSize: "50px" }}>
            List of orchids
          </h2>
          <div className="add-btn">
            <Add onAdd={handleAdd} />
          </div>
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
                      onClick={() => navigate(`/dashboard/edit/${orchid.id}`)}
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
          <div className="update-form">
            <Update onUpdate={handleUpdate} />
          </div>
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
