import React, { useEffect, useState } from 'react'
import './css/create.css';
import axios from '../apis';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const EditTask = ({ boards, setBoards }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');

    const navigate = useNavigate();

    const {boardId, taskId} = useParams();
    const [board,setBoard] = useState({});
    const [tasks,setTasks] = useState([]);
    const [task,setTask] = useState([]);

    useEffect(()=>{
        if (boards.length > 0 && boardId) {
            const currBoard = boards.find(board => board.id == boardId);
            
            if (currBoard) {
                setBoard(currBoard);
                const tasks= currBoard.tasks;
                setTasks(currBoard.tasks);
                setTask(tasks.find((task) => task.id===taskId));
            }
        }
    },[boardId,boards,taskId]);

    useEffect(()=>{
        if (task){
            setTitle(task.title);
            setDeadline(task.deadline);
            setDescription(task.description);
            setPriority(task.priority);
        }
    
    },[task]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email= JSON.parse(localStorage.getItem('user')).email;
            const updatedTask= { id:taskId, title, description, deadline, priority }

            const response = await axios.put(`tasks/update/${taskId}`,{email , updatedTask, boardId });
            console.log(response.data);

            if (response.data.success) {
                const newTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
                setTasks(newTasks);
                const updatedBoard = {...board, tasks:newTasks};
                setBoard(updatedBoard)
                const newBoards= boards.map(board => board.id==boardId ? updatedBoard : board);
                setBoards(newBoards);

                navigate(`/tasks/${boardId}`);
                toast.success("Updated task.");
            }
            else toast.error(response.data.message);

        } catch (error) {
            console.log(error);
            toast.error(`Oops! Server Issue :( \n Lemme fix it in a minute...`)
        }
    };

    return (
        <div className="CreateTask new-task-container">
            <div className="new-task-form">
                <h2> Update Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Update Task</button>
                </form>
            </div>
        </div>
    )
};


export default EditTask;