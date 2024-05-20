
import { useNavigate, useParams } from 'react-router-dom';
import './css/tasks.css';
import axios from '../apis';
import { useState, useEffect } from 'react';
import Missing from '../components/Missing';

const Tasks = ({ boards, setBoards }) => {
    const navigate = useNavigate();
    const boardId = useParams().id;
    const [board, setBoard] = useState({});
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        if (boards.length > 0 && boardId) {
            const currBoard = boards.find(board => board.id == boardId);
            if (currBoard) {
                setBoard(currBoard);
                setTasks(currBoard.tasks);
            }
        }
    }, [boardId, boards]);


    const handleDelete = async (id) => {

        const params = { email: JSON.parse(localStorage.getItem('user')).email, boardId: boardId };
        try {
            const response = await axios.delete(`tasks/delete/${id}`, { params });
            console.log(response.data);

            if (response.data.success) {
                const newTasks = tasks.filter((task) => task.id !== id);
                setTasks(newTasks);
                const updatedBoard = { ...board, tasks: newTasks };
                setBoard(updatedBoard)
                const newBoards = boards.map(board => board.id == boardId ? updatedBoard : board);
                setBoards(newBoards);
            }


        } catch (error) {
            console.log("Delete Error: ", error);
        }

    }

    return (
        tasks.length ?

            <div className='Tasks'>
                <h1 className='title'>My Tasks</h1>
                <div className='task-container'>
                    {tasks.map((task, index) => (
                        <div key={task.id} className={`task-card card-${index % 5}`}>
                            <div>
                                <h3>{task.title}</h3>
                                <p><span>{task.priority}</span> Priority </p>
                                <p>Complete By: <span>{new Date (task.deadline).toISOString().substring(0,10)}</span></p>
                                <p>{task.description}</p>
                                
                            </div>
                            <div className='btn-container'>
                                <button className='edit-btn' onClick={() => navigate(`/task/edit/${boardId}/${task.id}`)}>
                                    <i className="fa-solid fa-pencil" ></i>
                                </button>
                                <button className='delete-btn' onClick={() => handleDelete(task.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='create-task-btn' onClick={() => navigate(`/task/new/${boardId}`)} > + </button>
            </div>

            :
            
            <Missing 
                text={"Tasks"}
                CreateBtn={<button className='create-task-btn' onClick={() => navigate(`/task/new/${boardId}`)} > + </button>}
            />


    )
}

export default Tasks;