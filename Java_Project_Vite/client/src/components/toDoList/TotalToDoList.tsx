import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import '../../style.css'
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

const TotalToDoList: FC = () => {

    
    return (
        <>
            <div className='addToDo'>
                <h2>Add a task</h2>
                <ToDoForm />
            </div>
            <div className='body'>
                <ToDoList/>
            </div>
            
        </>
    );
};

export default TotalToDoList;