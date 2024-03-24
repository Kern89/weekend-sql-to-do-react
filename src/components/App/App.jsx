import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App () {
  
  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    Axios.get('/api/todo').then((response) => {
      console.log('Data:', response.data);
      setTodoList(response.data);
    }).catch((error) => {
      console.log('Error in axios GET', error);
      alert('Something went wrong')
    })
  };



  return (
    <div>
      <h1>TO DO APP</h1>
    </div>
  );

}

export default App
