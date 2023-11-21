import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse } from '@mui/material';

const ToDoList = (props) => {
    const [id, setId] = useState([]);
    const [body, setBody] = useState([]);
    const [title, setTitle] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [checkedIndex, setCheckedIndex] = useState([]);

    const handleExpandClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const changeChecked = (index) => {
        let newArray = [...checkedIndex];
        if (newArray.includes(index)) {
            newArray = newArray.filter((value) => value !== index);
        } else {
            newArray.push(index);
        }
        setCheckedIndex(newArray);
    };

    const deleteToDo = (index) => {
        console.log(typeof index)
        axios.delete('http://localhost:8080/api/delete', { data: {index} } )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/todos')
            .then(res => {
                setId(res.data[0])
                setBody(res.data[1])
                setTitle(res.data[2])
            })
            .catch(err => console.log(err))
    }, [props.refresh,deleteToDo]);

    return (
        <>
            <div className='ToDoBody'>
                <div className='ToDoTopBar'>
                    <h1>My To-Do List</h1>
                </div>
                {title.map((item, index) => (
                    <div key={index}>

                        <div className='Task'>
                            <div className='checkButton'>
                                {checkedIndex.includes(index) ?
                                    <CheckCircleIcon style={{color:'green'}} onClick={() => changeChecked(index)} />
                                    :
                                    <RadioButtonUncheckedIcon onClick={() => changeChecked(index)} />}
                            </div>
                            <div className='toDoTextTitle'>
                                <p style={{ textDecoration: checkedIndex.includes(index) ? 'line-through' : 'none' }}>{item}</p>
                            </div>

                            <div className='expandButton'>
                                
                                <ExpandMoreIcon onClick={() => handleExpandClick(index)} />
                            </div>
                        </div>

                        <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit className={expandedIndex === index ? 'expanded' : ''}>
                            <div className='toDoTextBody'>
                                <div className='textBody1'>
                                    <p style={{ textDecoration: checkedIndex.includes(index) ? 'line-through' : 'none' }}>{body[index]}</p>
                                </div>
                                <div className= 'textBody2'>
                                    <DeleteIcon style = {{color:'red'}} onClick = {() => deleteToDo(id[index])}/>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ToDoList;