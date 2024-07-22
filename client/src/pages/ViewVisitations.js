import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/Visitations.css'

const ViewVisitations = () => {
  const [visitations, setVisitations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVisitations = async () => {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const { data } = await axios.get(
            `/api/visitations`,
            config
          );
          setVisitations(data);
        } catch (error) {
          console.error("Error fetching visitations:", error);
        }
      }
    };

    fetchVisitations();
  }, [user]);

  return (
    <div className="view-visitations">
      <h1>Visitations List</h1>
      <div className="visitation-list">
        {visitations.length > 0 ? (
          visitations.map((visitation) => (
            <div key={visitation._id} className="visitation-item">
              <p>Visitor Name: {visitation.visitorName}</p>
              <p>Prisoner ID and Relation: {visitation.relation}</p>
              <p>Approval Status: {visitation.approvalStatus}</p>
            </div>
          ))
        ) : (
          <p>No visitations found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewVisitations;
