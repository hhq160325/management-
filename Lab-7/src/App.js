import "./App.scss";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/contact/Contact";
import Dashboard from "./components/dashboard/Dashboard";
import Navigation from "./components/navigation/Navigation";
import AddOrchid from "./components/dashboard/AddOrchid";
import EditOrchid from "./components/dashboard/EditOrchid";
import Login from "./components/login";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [data, setData] = useState(null);

  const handleLogout = () => {
    setData(null);
  };

  return (
    <div className="App">
      <Navigation data={data} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard data={data} />} />
        <Route path="/dashboard/add" element={<AddOrchid data={data} />} />
        <Route
          path="/dashboard/edit/:id"
          element={<EditOrchid data={data} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login setData={setData} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
