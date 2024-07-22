import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Incidents.css";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [description, setDescription] = useState("");
  const [involvedParties, setInvolvedParties] = useState([]);
  const [actionsTaken, setActionsTaken] = useState("");
  const [editIncident, setEditIncident] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchIncidents = async () => {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const { data } = await axios.get(
            `/api/incidents`,
            config
          );
          setIncidents(data);
        } catch (error) {
          console.error("Error fetching incidents:", error);
        }
      }
    };

    fetchIncidents();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        if (editIncident) {
          // Update existing incident
          await axios.put(
            `/api/incidents/${editIncident._id}`,
            { description, involvedParties, actionsTaken },
            config
          );
          setIncidents(
            incidents.map((inc) =>
              inc._id === editIncident._id
                ? { ...inc, description, involvedParties, actionsTaken }
                : inc
            )
          );
          setEditIncident(null);
          alert("Incident successfully updated.");
        } else {
          // Create new incident
          const { data } = await axios.post(
            `/api/incidents`,
            { description, involvedParties, actionsTaken },
            config
          );
          setIncidents([...incidents, data]);
          alert("Incident successfully added.");
        }

        setDescription("");
        setInvolvedParties("");
        setActionsTaken("");
      } catch (error) {
        console.error("Error handling incident:", error);
        alert("Error handling incident. Please try again.");
      }
    }
  };

  const handleEdit = (incident) => {
    setEditIncident(incident);
    setDescription(incident.description);
    setInvolvedParties(incident.involvedParties);
    setActionsTaken(incident.actionsTaken);
  };

  const handleDelete = async (id) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        await axios.delete(
          `/api/incidents/${id}`,
          config
        );
        setIncidents(incidents.filter((incident) => incident._id !== id));
        alert("Incident successfully deleted.");
      } catch (error) {
        console.error("Error deleting incident:", error);
        alert("Error deleting incident. Please try again.");
      }
    }
  };

  const viewIncidents = () => {
    navigate("/view-incidents"); // Navigate to the new page
  };

  return (
    <div className="incidents">
      <h1>Incidents</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prisoners ID of all Involved Prisoners (comma-separated)"
          value={involvedParties}
          onChange={(e) => setInvolvedParties(e.target.value.split(","))}
        />
        <input
          type="text"
          placeholder="Actions Taken"
          value={actionsTaken}
          onChange={(e) => setActionsTaken(e.target.value)}
        />
        <button type="submit">
          {editIncident ? "Update" : "Add"} Incident
        </button>
      </form>
      <button onClick={viewIncidents}>Incidents List</button>
    </div>
  );
};

export default Incidents;
