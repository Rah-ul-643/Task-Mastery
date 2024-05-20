
import { useNavigate } from 'react-router-dom';
import './css/boards.css';
import axios from '../apis';
import Missing from '../components/Missing';

const Boards = ({ boards, setBoards }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {

        const params = { email: JSON.parse(localStorage.getItem('user')).email };
        try {
            const response = await axios.delete(`/boards/delete/${id}`, { params });
            console.log(response.data);

            const newBoards = boards.filter((board) => board.id !== id);
            setBoards(newBoards);

        } catch (error) {
            console.log("Delete Error: ", error);
        }

    }
    // array storing background imags for cards
    const imageArr = [
        'https://images.pexels.com/photos/305816/pexels-photo-305816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        "https://images.pexels.com/photos/1781710/pexels-photo-1781710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3685175/pexels-photo-3685175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2881261/pexels-photo-2881261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/6063609/pexels-photo-6063609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]

    return (
        boards.length ?

            <div className='Boards'>
                <h1 className='title'>My Boards</h1>
                <div className='container'>

                    {boards.map((board, index) => {

                        let tasks = []
                        if (board.tasks) {
                            tasks = board.tasks.length > 3 ? board.tasks.slice(0, 3) : board.tasks;
                        }

                        return (
                            <div key={board.id} className={index % 2 === 0 ? 'board-container' : 'board-container reverse-flex'} >
                                <div
                                    className={index % 2 === 0 ? `card-left card card-${index % 5}` : `card-right card card-${index % 5}`
                                    }>
                                    <div>
                                        <h3 onClick={() => navigate(`/tasks/${board.id}`)}>{board.title}</h3>
                                        <p>{board.description}</p>
                                    </div>
                                    <div className='btn-container'>
                                        <button onClick={() => navigate(`/board/edit/${board.id}`)}>
                                            <i className="fa-solid fa-pencil" ></i>
                                        </button>

                                        <button onClick={() => handleDelete(board.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className='task-cards-container' style={{ 'backgroundImage': `url(${imageArr[index % 5]})` }}>
                                    {tasks.length ?

                                        tasks.map(task => (
                                            <div className='task-item'><h2>{task.title}</h2></div>)
                                        )
                                        :
                                        (<div className='task-item'><h2>No Tasks</h2></div>)
                                    }

                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
                <button className='create-task-btn' onClick={() => navigate('/boards/new')} > + </button>
            </div>

            :

            <Missing
                text={"Boards"}
                CreateBtn={<button className='create-task-btn' onClick={() => navigate('/boards/new')} > + </button>}
            />


    )
}

export default Boards;