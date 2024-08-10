import { useEffect, useState } from 'react';
import { FaTrashAlt, FaClipboardCheck, FaRegEdit } from "react-icons/fa";
import logo from './assets/images/BayanSap.png';
import './App.css';
// import {Greet} from "../wailsjs/go/main/App";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setTitle] = useState("")
    const [newDescription, setDescription] = useState("")
    const [completedTodos, setCompletedTodos] = useState([])

    const handleAddTodo = () => {
        let newTodoItem = {
        title: newTitle,
        description: newDescription
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoArr))
    }

    const handleDelete = (index) => {
        let reducedTodos = [...allTodos];
        reducedTodos.splice(index);
        setTodos(reducedTodos)
        localStorage.setItem('todoList', JSON.stringify(reducedTodos))
    }

    const handleComplete = (index) => {
        let now = new Date();
        let now_d = now.getDate()
        let now_m = now.getMonth() + 1
        let now_y = now.getFullYear()
        let completedOn = now_y + '-' + now_m + '-' + now_d

        let filteredItem = {
        ...allTodos[index],
        completedOn: completedOn
        }

        
        let updatedCompleted = [...completedTodos];
        updatedCompleted.push(filteredItem)
        setCompletedTodos(updatedCompleted)

        handleDelete(index)

        localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted))
    }

    const handleDeleteCompleted = (index) => {
        let reducedCompleted = [...completedTodos];
        reducedCompleted.splice(index);
        setCompletedTodos(reducedCompleted)
        localStorage.setItem('completedTodos', JSON.stringify(reducedCompleted))
    }

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todoList'))
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
        setTodos(savedTodo)
        }
        if (savedCompletedTodo) {
        setCompletedTodos(savedCompletedTodo)
        }
    }, [])

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <h1>To Do!</h1>
            <div className='todo-wrapper'>
                <div className='todo-inputs'>

                <div className='todo-input-item'>
              {/* <label>Task</label> */}
                    <div>
                        <input type='text' value={newTitle} onChange={(e) => setTitle(e.target.value)} 
                        placeholder='Enter your task'></input>
                    </div>
                </div>

                <div className='todo-input-item'>
                {/* <label>Description</label> */}
                    <div>
                        <input type='text' value={newDescription} onChange={(e) => setDescription(e.target.value)}
                        placeholder='Describe your task'></input>
                    </div>
                </div>

                <div className='todo-input-item'>
                {/* <label> </label> */}
                <div>
                    <button type='button' onClick={handleAddTodo} 
                    className='primary-button'>Add</button>
                </div>
                </div>
            </div>

            <div className='button-area'>
                <button className={`secondary-button ${isCompleteScreen === false && 'active'}`} 
                onClick={() => setIsCompleteScreen(false)}>To Do</button>
                <button className={`secondary-button ${isCompleteScreen === true && 'active'}`} 
                onClick={() => setIsCompleteScreen(true)}>Completed</button>
            </div>

            <div className='todo-list'>
                {isCompleteScreen===false && allTodos.map((item, index) => {
                return (
                    <div className='todo-list-item' key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className='icons'>
                            <FaTrashAlt className='trash' onClick={() => handleDelete(index)}/>
                            <FaClipboardCheck className='check' onClick={() => handleComplete(index)}/>
                            <FaRegEdit className='check' onClick={() => handleComplete(index)}/>
                        </div>
                    </div>
                )
                })}

                {isCompleteScreen===true && completedTodos.map((item, index) => {
                return (
                    <div className='todo-list-item' key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p><small>{item.completedOn}</small></p>
                        </div>
                        <div className='icons'>
                            <FaTrashAlt className='trash' onClick={() => handleDeleteCompleted(index)}/>
                            {/* <FaClipboardCheck className='check' onClick={() => handleComplete(index)}/> */}
                        </div>
                    </div>
                )
                })}
            </div>

        </div>
        </div>
    )
}

export default App