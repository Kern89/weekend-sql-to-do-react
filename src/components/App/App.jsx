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
      console.log('Error in axios GET:', error);
      alert('Something went wrong in axios.get')
    })
  };

useEffect(() => {
  getTodoList();
}, []);

const sendToServer = (e) => {
  e.preventDefault();
  console.log('task:', todoItem);
  // variable for axio post
  const data = { task: todoItem, duedate: duedate }
  axios.post('/api/todo', data).then((response) => {
    getTodoList();
  }).catch((error) => {
    console.log('Error in axios POST:', error);
    alert('Something went wrong in axios.post')
  })


}

  return (
    <div>
      <h1>TO DO APP</h1>
      <form onSubmit={sendToServer} >
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
