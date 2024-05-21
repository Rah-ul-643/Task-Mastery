import axios from 'axios';

const instance= axios.create(
    {
        baseURL:"https://task-mastery.onrender.com/api/"
    }
)

export default instance;