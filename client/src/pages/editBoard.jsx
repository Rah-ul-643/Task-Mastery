import React, { useEffect, useState } from 'react'
import './css/create.css';
import axios from '../apis';
import { useNavigate, useParams } from 'react-router-dom';


const EditBoard = ({ boards, setBoards }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const boardId = useParams().id;
    const board= boards.find(board => board.id == boardId);

    useEffect(()=>{
        if (board){
            setTitle(board.title);
            setDescription(board.description);
        }
    },[board]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email= JSON.parse(localStorage.getItem('user')).email;
            const updatedBoard= { ...board, title, description};

            const response = await axios.put(`boards/update/${boardId}`,{email , updatedBoard });
            console.log(response.data);

            if (response.data.success) {
                
                const newBoards= boards.map(board => board.id==boardId ? updatedBoard : board);
                setBoards(newBoards);

                navigate(`/boards`);
            }
            else console.log(response.data.message);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="CreateTask new-task-container">
            <div className="new-task-form">
                <h2> Update Board</h2>
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

                    <button type="submit" className="btn">Update Board</button>
                </form>
            </div>
        </div>
    )
};


export default EditBoard;