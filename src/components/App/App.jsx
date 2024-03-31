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
  const deleteTask = (id) => {
    axios.delete(`/api/todo/${id}`).then((response) => {
      console.log('In axios delete');
      getTodoList();
    }).catch((error) => {
      console.log('Error in axios delete:', error);
      alert('Something went wrong in axios delete')
    })
  }

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
  };

  const completeTask = (id) => {
    console.log('Complete:', id);
    axios.put(`/api/todo/complete/${id}`).then((response) => {
      getTodoList();
    }).catch((error) => {
      console.log('Error in axios PUT:', error);
      alert('Something went wrong in axios.PUT')
    })
  }

  return (
    <div>
      <h1>Complete-Me List App</h1>
      <form onSubmit={sendToServer} >
        New task: <input type="text" value={todoItem} 
        onChange={(e) => setTodoItem(e.target.value)} />
        <br />
        <br />
        Due on: <input type="date" value={duedate} 
        onChange={(e) => setDueDate(e.target.value)} />
        <br />
        <div id='submitContainer'>
          <input type="submit" value="submit" id="submit" />
        </div>
      </form>
      <br />
      <br />
      {/* table for tasks */}
      <div id='table' >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Due On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          todoList.map((task) => {
            return <tr key={task.id} className={task.completed ? 'completed' : 'not-completed'}>
              <td><input type="checkbox" onClick={() => completeTask(task.id)} ></input></td>
              <td>{task.task}</td>
              <td>{task.duedate}</td>
              <td><button onClick={() => deleteTask(task.id)}>Delete</button></td>
              {/* <td><button onClick={editTask}>Edit</button></td> */}
              </tr>
          })
        }
        </tbody>
      </table>
      </div>
    </div>
  );

}

export default App
