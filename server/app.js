require("dotenv").config();
const express = require('express');
const cors = require("cors");
const userRoutes = require("./routes/users");

const connectDB =  require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server running on port ${port}`));  
        await connectDB(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
}

start();
