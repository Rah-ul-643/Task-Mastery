import React, { useState } from 'react'
import './css/create.css';
import axios from '../apis';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBoard = ({ boards, setBoards }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = boards.length ? boards[boards.length - 1].id + 1 : 1

        try {
            const email= JSON.parse(localStorage.getItem('user')).email;
            const response = await axios.post('boards/new',{email , newBoard: { id, title, description, tasks:[] } });
            console.log(response.data);

            if (response.data.success) {
                const newBoards = [...boards,{ id, title, description, tasks:[] }]
                setBoards(newBoards);
                toast.success("New Board Created");
                navigate(`/boards`);
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
                <h2> New Board</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="New Board Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder='Briefly describe the purpose'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Create Board</button>
                </form>
            </div>
        </div>
    )
};


export default CreateBoard;