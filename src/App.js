// import './App.css'
import AppRouting from './AppRouting';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import TaskListMain from './components/TaskList/TaskListMain';
import AddTask from './components/AddTaskForm/AddTask';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route path='/register' element ={<Register/>}/>
        <Route path='/main' element={<TaskListMain/>}/>
        <Route path='/addTask' element={<AddTask/>}/>
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
