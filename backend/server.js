import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

// app configuration
const app = express()
const PORT = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/admin", adminRouter)

app.get("/", (req, res) => {
    res.send("Prescripto backend is working fine.")
})

// server stsrting
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`) )