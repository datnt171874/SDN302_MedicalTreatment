const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const authRoute = require("./routes/authRoute")
const doctorRoute = require("./routes/doctorRoute")
dotenv.config();
const app = express()

mongoose.connect(process.env.MONGODB_CONNECT_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{ 
  console.log("Connected to MongoDB");
  app.listen(3000, ()=> console.log("Server is running on port 3000"));
})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});


app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.user("/api/doctor", doctorRoute)


