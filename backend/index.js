require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { MONGO_URL, FRONTEND_URL } = require('./Config/Config');
const cookieParser = require('cookie-parser');
const { taskRouter } = require('./routes/task');
const cors = require('cors')

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)


const Main =async()=>{
    app.listen(3000);
    console.log("Server is running on port 3000");
    await mongoose.connect(MONGO_URL)
    console.log("Connected to MongoDB");
}
Main()