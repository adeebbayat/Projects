import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css'
import ToDoList from '../components/ToDoList';
import AddToDoTask from '../components/AddToDoTask';

const Main = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <div className='topBar'>
                <div className='leftSide'>
                    <h1>To-Do List</h1>
                </div>
                <div className='rightSide'>
                </div>
            </div>
            <div className='body'>
                <ToDoList refresh={refresh} />
            </div>
            <div className='addToDo'>
                <h2>Add a task</h2>
                <AddToDoTask refreshPage={refreshPage} />
            </div>
        </>
    );
};

export default Main;