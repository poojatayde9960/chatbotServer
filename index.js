const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser") //backend mdhn  frontend la tokan access krnyasathi  cookie parser 
require("dotenv").config()
const app = express()

app.use(cookieParser())
app.use(express.json())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use("/api/chat", require("./routes/chat.routes"))

app.use((req, res) => {
    res.status(404).json({ message: "Resouece Not Found" })
})

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "something Went Wrong" })
})
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", (req, res) => {
    console.log("MONGOOSE CONNECTION SUCCESS")
    app.listen(process.env.PORT, console.log("SERVER RUNNING", process.env.PORT))
})




