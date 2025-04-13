const Router = require('express')
const { Auth } = require('../middleware/Auth');
const { Task } = require('../model/Databse');
const taskRouter = Router()

//post task
taskRouter.post('/', Auth, async(req, res)=>{
    const {title, content} = req.body;
    const userId = req.user;
    try{
        const task = await Task.create({
            title,
            content,
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
// get all task
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
//update the task as done
taskRouter.put("/:id", Auth, async(req, res)=>{
    const userId = req.user;
    const {id} = req.params;
    // const {done} = req.body;

    try{
        const markDone = await Task.findByIdAndUpdate(id,{
            done: true
        })
        res.json({
            message: "Mark as done",
            markDone: markDone
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
//get a task
taskRouter.get("/:id", Auth,async(req, res)=>{
    const {id} = req.params;

    try{
        const task = await Task.findById(id)
        res.json({
            task: task
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
//delete a task
taskRouter.delete("/:id", Auth, async(req, res)=>{
    const {id} = req.params;
    const userId = req.user;

    try{
        const removetask = await Task.findByIdAndDelete(id, {userId: userId})
        if(removetask){
            return res.json({
                message: "Task deleted"
            })
        }
        return res.status(404).json({
            message: "Task deletation failed"
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
module.exports = {
    taskRouter
}