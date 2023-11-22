import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import '../../style.css'
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

const TotalToDoList: FC = () => {
    const [refresh, setRefresh] = useState<boolean>(false);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <div className='addToDo'>
                <h2>Add a task</h2>
                <ToDoForm refreshPage={refreshPage} />
            </div>
            <div className='body'>
                <ToDoList refresh={refresh} />
            </div>
            
        </>
    );
};

export default TotalToDoList;
