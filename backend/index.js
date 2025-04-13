require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { MONGO_URL, FRONTEND_URL } = require('./Config/Config');
const cookieParser = require('cookie-parser');
const { taskRouter } = require('./routes/task');
const cors = require('cors')
const path = require('path')
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})
const Main =async()=>{
    app.listen(3000);
    console.log("Server is running on port 3000");
    await mongoose.connect(MONGO_URL)
    console.log("Connected to MongoDB");
}
Main()