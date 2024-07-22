import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Visitations.css";

const Visitations = () => {
  const [visitations, setVisitations] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [relation, setRelation] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchVisitations = async () => {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const { data } = await axios.get(`/api/visitations`, config);
          setVisitations(data);
        } catch (error) {
          console.error("Error fetching visitations:", error);
        }
      }
    };

    fetchVisitations();
  }, [user]);

  const addVisitation = async (e) => {
    e.preventDefault();
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const { data } = await axios.post(
          `/api/visitations`,
          { visitorName, relation, approvalStatus },
          config
        );
        setVisitations([...visitations, data]);
        setVisitorName("");
        setRelation("");
        setApprovalStatus("");
        setSuccessMessage("Visitation added successfully!"); // Set success message
        setErrorMessage(""); // Clear error message
      } catch (error) {
        setErrorMessage("Error adding visitation. Please try again."); // Set error message
        setSuccessMessage(""); // Clear success message
      }
    }
  };

  const viewVisitations = () => {
    navigate("/view-visitations"); // Navigate to the new page
  };

  return (
    <div className="visitations">
      <h1>Visitations</h1>
      <form onSubmit={addVisitation}>
        <input
          type="text"
          placeholder="Visitor Name"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prisoner ID and Relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Approval Status"
          value={approvalStatus}
          onChange={(e) => setApprovalStatus(e.target.value)}
        />
        <button type="submit">Add Visitation</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}{" "}
      {/* Display success message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <button onClick={viewVisitations}>Visitations List</button>{" "}
    </div>
  );
};

export default Visitations;
