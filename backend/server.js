const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const prisonerRoutes = require("./routes/prisonerRoutes");
const visitationRoutes = require("./routes/visitationRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/prisoners", prisonerRoutes);
app.use("/api/visitations", visitationRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
