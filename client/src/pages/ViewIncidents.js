import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/ViewIncidents.css'

const ViewIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const { user } = useContext(AuthContext);

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

  return (
    <div className="view-incidents">
      <h1>Incidents List</h1>
      <div>
        {incidents.map((incident) => (
          <div key={incident._id} className="incident-card">
            <p>
              <strong>Description:</strong> {incident.description}
            </p>
            <p>
              <strong>Prisioners ID of all Involved Prisioners:</strong>{" "}
              {incident.involvedParties.join(", ")}
            </p>
            <p>
              <strong>Actions Taken:</strong> {incident.actionsTaken}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIncidents;
