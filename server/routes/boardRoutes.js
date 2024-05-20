const router = require('express').Router();

const taskModel = require('../models/tasks');

const { getRecords, updateRecord } = require('../controllers/dbController');

router.get('/', async (req, res) => {
    const email = req.query;                          // email used as username to filter the data from tasks collection.

    try {
        const document = await getRecords(taskModel, email);
        const boards = document.boards;

        res.status(200).json(boards);

    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }

})


router.post('/new',async (req, res) => {
    const {email,newBoard} = req.body;

    try {
        const document = await getRecords(taskModel, {email:email});
        const boards = document.boards;
        const newBoards= [...boards,newBoard];
        await updateRecord(taskModel,{email:email},{email:email,boards:newBoards})

        res.status(200).json({ success: true, message: "Created new board" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to create board", error: error })
    }
})


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const email = req.query.email;                          // email used as username to filter the data from tasks collection.

    try {
        const document = await getRecords(taskModel, {email:email});
        const boards = document.boards.filter((board) => board.id != id);
        await updateRecord(taskModel,{email:email},{email:email,boards:boards})
        console.log(boards);
        res.status(200).json({ success: true, message: "Board Deleted" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to delete board", error: error })
    }
    
    
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const {email,updatedBoard} = req.body;

    try {
        const document = await getRecords(taskModel, {email:email});
        const updatedBoards = document.boards.map((board) => board.id == id ? updatedBoard : board);

        await updateRecord(taskModel,{email:email},{email:email,boards:updatedBoards})

        res.status(200).json({ success: true, message: "Updated board" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to update board", error: error })
    }
})

module.exports = router;