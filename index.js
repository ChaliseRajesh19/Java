import express from "express";
import routers from "./routes/routes.js";
import cors from 'cors';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/api", routers);

app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is running on port", port);
});