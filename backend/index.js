const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const doctorRoute = require("./routes/doctorRoute");
const seedRoute = require("./routes/seedRoute");
const treatmentPlanRoute = require("./routes/treatmentPlanRoute");
const reminderRoute = require("./routes/reminderRoute");
const medicalRecordRoute = require("./routes/medicalRecordRoute");
const pricingRoute = require("./routes/pricingRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server is running on port", PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/seed", seedRoute);
app.use("/api", treatmentPlanRoute);
app.use("/api/reminders", reminderRoute);
app.use("/api/medical-records", medicalRecordRoute);
app.use("/api/pricing", pricingRoute);
