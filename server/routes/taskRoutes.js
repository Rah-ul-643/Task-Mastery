const router = require('express').Router();

const taskModel = require('../models/tasks');

const { getRecords } = require('../controllers/dbController');


router.post('/new',async (req, res) => {
    const {email,boardId,newTask} = req.body;

    try {
        const document = await getRecords(taskModel, {email:email});
        const board = document.boards.find(board => board.id==boardId);

        board.tasks.push(newTask);
       
        await document.save();
        console.log("Task created");

        res.status(200).json({ success: true, message: "Created new task" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to create task", error: error })
    }
})


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const {email,boardId} = req.query;                          // email used as username to filter the data from tasks collection.

    try {
    
        const document = await getRecords(taskModel, {email:email});
        const board = document.boards.find(board => board.id==boardId);
        const taskIndex = board.tasks.findIndex(task => task.id == id);
        
        board.tasks.splice(taskIndex, 1);

        await document.save();
        console.log("Record deleted");

        res.status(200).json({ success: true, message: "Task Deleted" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to delete task", error: error })
    }
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const {email,updatedTask,boardId} = req.body;

    try {

        const document = await getRecords(taskModel, {email:email});
        const board = document.boards.find(board => board.id==boardId);
        const taskIndex = board.tasks.findIndex(task => task.id == id);
        
        board.tasks[taskIndex] = updatedTask;

        await document.save();
        console.log("updated task");

        res.status(200).json({ success: true, message: "Updated task" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to update task", error: error })
    }
})

module.exports = router;