const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    done: {
        type: Boolean,
        default: false 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cretedAt: {
        type: Date,
        default: new Date
    },
})

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { User, Task }