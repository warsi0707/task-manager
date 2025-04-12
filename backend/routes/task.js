const Router = require('express')
const { Auth } = require('../middleware/Auth');
const { Task } = require('../model/Databse');
const taskRouter = Router()

taskRouter.post('/', Auth, async(req, res)=>{
    const {title, content, done} = req.body;
    const userId = req.user;
    try{
        const task = await Task.create({
            title,
            content,
            done,
            userId: userId
        })
        if(task){
            return res.json({
                message: 'Task added'
            })
        }
        return res.status(404).json({
            message: 'Task added failed'
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
taskRouter.get("/", Auth, async (req, res)=>{
    const userId = req.user;
    try{
        const tasks = await Task.find({userId: userId}).populate('userId', 'username')
        if(tasks ==0){
            return res.status(404).json({
                message: 'Task empty'
            })
        }
        res.json({
            tasks: tasks
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
taskRouter.put("/:id", Auth, async(req, res)=>{
    const userId = req.user;
    const {id} = req.params;

    try{
        
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
module.exports = {
    taskRouter
}