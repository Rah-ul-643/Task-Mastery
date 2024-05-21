import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './pages/login';
import Register from './pages/register';
import CreateTask from './pages/createTask';
import Tasks from './pages/tasks';
import Boards from './pages/boards';
import EditTask from './pages/editTask';
import CreateBoard from './pages/createBoard';
import EditBoard from './pages/editBoard';

import axios from './apis';
import Missing from './components/Missing';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);
  const [boards,setBoards] = useState([]);

  useEffect(() => {
  
    const makeRequest = async () => {
      try {
        const params = { email: JSON.parse(localStorage.getItem('user')).email };

        const response = await axios.get('/boards', { params });
        if (response.data) {
          setBoards(response.data);
          console.log(response.data);
        }

      } catch (error) {
        console.log(error);
        setBoards([]);
      }
    }

    if (isLoggedIn) makeRequest();

  }, [isLoggedIn])


  return (
    <div className="App">
      <Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path='/boards' element={isLoggedIn ? <Boards boards={boards} setBoards={setBoards}/> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/tasks/:id' element={isLoggedIn ? <Tasks boards={boards} setBoards={setBoards}/> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/login' element={isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/boards/new' element={< CreateBoard boards={boards} setBoards={setBoards}/> } />
        <Route path='/board/edit/:id' element={<EditBoard boards={boards} setBoards={setBoards} /> } />
        <Route path='/task/new/:id' element={
          isLoggedIn ?
          <CreateTask
            boards={boards}
            setBoards={setBoards}
          />
          :
          <Login setIsLoggedIn={setIsLoggedIn}/>
          
        } />

        <Route path='/task/edit/:boardId/:taskId' element={
          isLoggedIn ? 
            <EditTask boards={boards} setBoards={setBoards} /> : 
            <Login setIsLoggedIn={setIsLoggedIn}/>} 
        />
        <Route path='*' element={<Missing text={"content"} CreateBtn={""} /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
