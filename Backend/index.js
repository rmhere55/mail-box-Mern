dotenv.config();
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
const app = express();

app.use(cors(
    {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
));
app.use(express.json());

app.use("/user",  userRoutes)
app.use("/mail" ,mailRoutes)

app.get('/', (req, res) => {
    res.send('Mail Box Server Running');
});

const PORT = process.env.PORT || 5000;
// Database Sync
async function initializeDataBase() {
    const URL = process.env.MONGODB_SERVER_URL;
    await mongoose.connect(URL);
    app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

initializeDataBase();

