import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import axios from "axios";
import { baseURL } from "./utils/constents";

function App() {

  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);


  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    })
  }, [updateUI])

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI(!updateUI);
    })
  }

  const removeTask = (id) => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI(!updateUI)
    })
  }

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  }

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI(!updateUI);
      setUpdateId(null);
      setInput("");
    })
  }

  return (
    <main>

      <div className="title"><h1>CRUD Operations</h1></div>
      <div className="input_holder">
        <input
          name="task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task) => <ListItem key={task._id} {...{
          task: task.task,
          id: task._id,
          setUpdateUI: setUpdateUI,
          removeTask: removeTask,
          updateMode: updateMode
        }} />)}
      </ul>
    </main>
  );
}

export default App;
