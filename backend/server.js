const express = require("express");
const compression = require("compression");
const cors = require("cors")
require("dotenv").config();
const mongoose = require("mongoose");
const morgan  = require("morgan");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
app.use(compression())
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
mongoose.connect(process.env.DB).then(()=>console.log("DB Connected")).catch((err)=>console.error(`Error connecting DB : ${err}`));

app.use("/api/auth" ,authRoutes );
app.use("/api/user" ,userRoutes );
const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server Started`)
})
