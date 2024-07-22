import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Prisoners.css"

const Prisoners = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [name, setName] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [charges, setCharges] = useState("");
  const [sentenceDetails, setSentenceDetails] = useState("");
  const [location, setLocation] = useState("");
  const [documents, setDocuments] = useState("");
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchPrisoners();
    }
  }, [user]);

  const fetchPrisoners = async () => {
    try {
      const response = await axios.get(
        `/api/prisoners`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPrisoners(response.data);
    } catch (error) {
      console.error("Error fetching prisoners:", error);
    }
  };

  const addPrisoner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/prisoners`,
        {
          name,
          bookingId,
          charges,
          sentenceDetails,
          location,
          documents,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPrisoners([...prisoners, response.data]);
      setName("");
      setBookingId("");
      setCharges("");
      setSentenceDetails("");
      setLocation("");
      setDocuments("");
      setImage("");
      toast.success("Prisoner added successfully");
    } catch (error) {
      console.error("Error adding prisoner:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="prisoners">
      <h1>Add Prisoners</h1>
      <form onSubmit={addPrisoner}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prisoner ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Charges"
          value={charges}
          onChange={(e) => setCharges(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sentence Details"
          value={sentenceDetails}
          onChange={(e) => setSentenceDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Documents (comma-separated)"
          value={documents}
          onChange={(e) => setDocuments(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Prisoner</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Prisoners;
