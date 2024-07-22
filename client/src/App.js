import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Prisoners from "./pages/Prisoners";
import Visitations from "./pages/Visitations";
import Incidents from "./pages/Incidents";
import { AuthProvider } from "./context/AuthContext";
import ViewVisitations from "./pages/ViewVisitations";
import ViewIncidents from "./pages/ViewIncidents";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prisoners" element={<Prisoners />} />
              <Route path="/visitations" element={<Visitations />} />
              <Route path="/view-visitations" element={<ViewVisitations />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/view-incidents" element={<ViewIncidents />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
