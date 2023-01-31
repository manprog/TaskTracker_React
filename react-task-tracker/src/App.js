import { useState, useEffect } from "react"
import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks"
import { AddTask } from './components/AddTask'
import { Footer } from "./components/Footer";
import { About } from "./components/About";

//Only one element can be return via App
function App() {
const [showAddTask, setShowAddTask] = useState(true)

const [tasks, setTasks] = useState([])

useEffect(()=> {
  const getTasks= async ()=> {
    const tasksFromServer = await fetchTasks()
    setTasks([...tasksFromServer]);
  }

  getTasks();
  
}, [])

const fetchTasks = async ()=> {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  
  return data;
}

const fetchTask = async (id)=> {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  
  return data;
}


// const addTask = (task)=>{
//   const newTask = {id: Math.random() * 1000,
//                    text: task.text,
//                    day: task.day,
//                    reminder: task.reminder
//                   }
//   setTasks([...tasks, newTask]);
// }

const addTask = async (task)=>{
  const res = await fetch("http://localhost:5000/tasks/", 
  {method: 'POST', headers: { 'Content-type': 'application/json'},
  body: JSON.stringify(task)}
  )

  const data = await res.json()
  setTasks([...tasks, data]);
}




// const deleteTask = (id) => {
//   setTasks(tasks.filter((task)=> task.id!==id));
// }

const deleteTask = async (id)=> {
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
  setTasks(tasks.filter((task)=> task.id!==id));
}

// const toggleReminder = (id) => {
//   setTasks(tasks.map((task)=> task.id===id ? {...task, reminder:!task.reminder}: task ))
// }

const toggleReminder = async (id) => {
  const taskToToogle = await fetchTask(id)

  const updatedTask = {...taskToToogle, reminder: !taskToToogle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, 
  {method: "PUT", headers: {"Content-type": "application/json"}, body: JSON.stringify(updatedTask)}
  )

  const data = res.json()
  setTasks(tasks.map((task)=> task.id===id ? {...task, reminder:data.reminder}: task ))
}

const toogleShowAddTask = ()=> {
  setShowAddTask(!showAddTask);
}

  return (
    <BrowserRouter>
      <div className="container">
        <Header title="Task Tracker" showAddTask={showAddTask} toogleShowAddTask={toogleShowAddTask}/>

        <Routes> <Route path='/' exact element={
          <>
          {showAddTask && <AddTask addtask={addTask}/>}
          {tasks.length > 0 ? 
          (<Tasks tasks={tasks} ondelete={deleteTask} togglereminder={toggleReminder}/>): 
          ("No Tasks to show")}
          </>
        } />

        <Route path='/about' element={<About />}/> 
        
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Class structure
// class App extends React.Component {
//   render(){
//     return <Header />
//   }
// }

export default App;
