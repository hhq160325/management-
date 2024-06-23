import React, { useState, useEffect } from "react";
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

function Dashboard({ data }) {
  const [staff, setStaff] = useState([]);
  const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;
  const confirm = useConfirm();

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setStaff(data))
      .catch((error) => console.log(error.message));
  }, []);

  const navigate = useNavigate();

  const EditFunction = (id) => {
    navigate("/dashboard/edit/" + id);
  };
  const RemoveFunction = (id) => {
    confirm({
      title: `Delete Staff id: ${id}`,
      description: "Are you sure you want to delete this staff?",
    })
      .then(() => {
        const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;
        fetch(baseUrl + id, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(`Delete Staff ID: ${id} success!`);
            setStaff((prevStaff) =>
              prevStaff.filter((staff) => staff.id !== id)
            );
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch(() => {
        // User canceled, do nothing
        toast.warning("Cancel delete");
      });
  };
  return (
    <div>
      {data ? (
        <TableContainer component={Paper} className="dashboard-container">
          <h2 style={{ textAlign: "center", color: "red", fontSize: "50px" }}>
            List of User
          </h2>
          <Link to="/dashboard/add" className="add-btn">
            <Button variant="contained">Create</Button>
          </Link>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="staff-table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell align="center">{staff.id}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={staff.avatar}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{staff.name}</TableCell>
                  <TableCell align="center">{staff.age}</TableCell>
                  <TableCell align="center">{staff.address}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => {
                        EditFunction(staff.id);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      className="delete-btn"
                      onClick={() => {
                        RemoveFunction(staff.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{ color: "red", textAlign: "center", fontSize: "40px" }}
          className="dashboard-container"
        >
          Please login to access the dashboard.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
