import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [filteredPrisoners, setFilteredPrisoners] = useState([]);
  const [searchId, setSearchId] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchPrisoners = async () => {
        try {
          const response = await axios.get("/api/prisoners", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setPrisoners(response.data);
          setFilteredPrisoners(response.data);
        } catch (error) {
          console.error("Error fetching prisoners:", error);
        }
      };

      fetchPrisoners();
    }
  }, [user]);

  const handleSearch = (e) => {
    setSearchId(e.target.value);
    if (e.target.value === "") {
      setFilteredPrisoners(prisoners);
    } else {
      setFilteredPrisoners(
        prisoners.filter((prisoner) =>
          prisoner.bookingId.includes(e.target.value)
        )
      );
    }
  };

  const handleDelete = async (prisonerId) => {
    try {
      await axios.delete(`/api/prisoners/${prisonerId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Remove the deleted prisoner from the state
      setPrisoners(prisoners.filter((prisoner) => prisoner._id !== prisonerId));
      setFilteredPrisoners(
        filteredPrisoners.filter((prisoner) => prisoner._id !== prisonerId)
      );
      alert("Prisoner successfully deleted.");
    } catch (error) {
      console.error("Error deleting prisoner:", error);
      alert("Error deleting prisoner. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Link to="/prisoners">Prisoner Management</Link>
      <Link to="/visitations">Visitation Management</Link>
      <Link to="/incidents">Incident Reporting</Link>

      <div className="search-bar">
        <input
          type="text"
          value={searchId}
          onChange={handleSearch}
          placeholder="Search by Prisoner ID"
        />
      </div>

      <div className="prisoner-list">
        <h2>Prisoner List</h2>
        {filteredPrisoners.length > 0 ? (
          filteredPrisoners.map((prisoner) => (
            <div key={prisoner._id} className="prisoner-item">
              <div className="prisoner-details">
                <h3>{prisoner.name}</h3>
                <p>Prisoner ID: {prisoner.bookingId}</p>
                <p>Charges: {prisoner.charges}</p>
                <p>Sentence Details: {prisoner.sentenceDetails}</p>
                <p>Location: {prisoner.location}</p>
                <p>Documents: {prisoner.documents.join(", ")}</p>
                <button
                  className="remove-button"
                  onClick={() => handleDelete(prisoner._id)}
                >
                  Remove
                </button>
              </div>
              {prisoner.image && (
                <img
                  src={prisoner.image}
                  alt={prisoner.name}
                  className="prisoner-image"
                />
              )}
            </div>
          ))
        ) : (
          <p>No prisoners found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
