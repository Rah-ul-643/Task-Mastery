import React, { useState } from 'react'
import './css/create.css';
import axios from '../apis';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const CreateTask = ({ boards, setBoards }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');

    const navigate = useNavigate();
    const boardId= useParams().id;

    const board= boards.find(board => board.id == boardId);
    const tasks= board.tasks;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1

        try {
            const email= JSON.parse(localStorage.getItem('user')).email;
            const response = await axios.post('tasks/new',{email ,boardId, newTask: { id, title, description, deadline, priority } });
            console.log(response.data);

            if (response.data.success) {
                const newTasks = [...tasks,{ id, title, description, deadline, priority }]
                const updatedBoard= {...board, tasks:newTasks}
                setBoards(boards.map(board => board.id == boardId ? updatedBoard : board ))
                navigate(`/tasks/${boardId}`);
                
                toast.success("New Task Created!");
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
                <h2> New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="What's new??"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder='A quick note'
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
                    <button type="submit" className="btn">Create Task</button>
                </form>
            </div>
        </div>
    )
};


export default CreateTask;