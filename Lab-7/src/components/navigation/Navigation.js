import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import "./Navigation.css";

function Navigation({ data, handleLogout }) {
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link style={{ textDecoration: "none" }} to="/">
            <Nav.Link href="#home">Home</Nav.Link>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/dashboard">
            <Nav.Link href="#dashboard">DashBoard</Nav.Link>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/contact">
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Link>
        </Nav>

        {data ? (
          <Button
            style={{ color: "black", backgroundColor: "yellow" }}
            color="inherit"
            onClick={handleLogout}
          >
            Sign-out
          </Button>
        ) : (
          <Button
            style={{ color: "black", backgroundColor: "yellow" }}
            color="inherit"
            component={NavLink}
            to="/login"
          >
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
