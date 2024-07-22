import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Visitations.css'

const Visitations = () => {
  const [visitations, setVisitations] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [relation, setRelation] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
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
      } catch (error) {
        console.error("Error adding visitation:", error);
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
          placeholder="Priosoner ID and Relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Approval Status"
          value={approvalStatus}
          onChange={(e) => setApprovalStatus(e.target.value)}
        />
        <button  type="submit">
          Add Visitation
        </button>
      </form>
      <button  onClick={viewVisitations}>
        Visitations List
      </button>{" "}
      {/* New button */}
    </div>
  );
};

export default Visitations;
