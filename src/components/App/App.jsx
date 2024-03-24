import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App () {
  
  const [duedate, setDueDate] = useState('');
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    axios.get('/api/todo').then((response) => {
      console.log('Data:', response.data);
      setTodoList(response.data);
    }).catch((error) => {
      console.log('Error in axios GET', error);
      alert('Something went wrong')
    })
  };

useEffect(() => {
  getTodoList();
}, []);

  return (
    <div>
      <h1>TO DO APP</h1>
      <form>
        New task: <input type="text" value={todoItem} 
        onChange={(e) => setTodoItem(e.target.value)} />
        Due on: <input type="date" value={duedate} 
        onChange={(e) => setDueDate(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );

}

export default App
