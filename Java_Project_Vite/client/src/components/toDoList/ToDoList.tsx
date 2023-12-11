import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import '../../style.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse } from '@mui/material';
import { add } from 'date-fns';

interface ToDoListProps {
    refresh: any; // Change the type according to the actual type of "refresh"
}

const ToDoList: FC<ToDoListProps> = (props) => {
    const [id, setId] = useState<number[]>([]);
    const [body, setBody] = useState<string[]>([]);
    const [title, setTitle] = useState<string[]>([]);
    const [date, setDate] = useState<Date[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [checkedIndex, setCheckedIndex] = useState<number[]>([]);

    const handleExpandClick = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const changeChecked = (index: number) => {
        let newArray = [...checkedIndex];
        if (newArray.includes(index)) {
            newArray = newArray.filter((value) => value !== index);
        } else {
            newArray.push(index);
        }
        setCheckedIndex(newArray);
    };

    const deleteToDo = (index: number) => {
        console.log(typeof index);
        axios.delete('http://localhost:8080/api/delete', { data: { index } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            // window.location.reload();
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/todos')
            .then(res => {
                const sortedData = res.data[3].map((date: string | number | Date, index: string | number) => ({
                    id: res.data[0][index],
                    body: res.data[1][index],
                    title: res.data[2][index],
                    date: new Date(date)
                })).sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => a.date.getTime() - b.date.getTime());

                const sortedIds = sortedData.map((item: { id: any; }) => item.id);
                const sortedBodies = sortedData.map((item: { body: any; }) => item.body);
                const sortedTitles = sortedData.map((item: { title: any; }) => item.title);
                const sortedDates = sortedData.map((item: { date: any; }) => item.date);
                const sortedUpdatedDates = sortedDates.map((item: any) => add(item, { days: 1 }));


                setId(sortedIds);
                setBody(sortedBodies);
                setTitle(sortedTitles);
                setDate(sortedUpdatedDates);
            })
            .catch(err => console.log(err));
    }, [props.refresh, deleteToDo]);

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
                                    <CheckCircleIcon style={{ color: 'green' }} onClick={() => changeChecked(index)} />
                                    :
                                    <RadioButtonUncheckedIcon onClick={() => changeChecked(index)} />}
                            </div>
                            <div className='toDoTextTitle'>
                                <p style={{ textDecoration: checkedIndex.includes(index) ? 'line-through' : 'none' }}>{item}</p>
                            </div>

                            <div className='expandButton'>
                                {/* Toggle between ExpandMoreIcon and ExpandLessIcon */}
                                {expandedIndex === index ? (
                                    <ExpandLessIcon onClick={() => handleExpandClick(index)} />
                                ) : (
                                    <ExpandMoreIcon onClick={() => handleExpandClick(index)} />
                                )}
                            </div>
                        </div>

                        <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit className={expandedIndex === index ? 'expanded' : ''}>
                            <div className='toDoTextBody'>
                                {/* <div className='textBody1'>
                                    <p style={{ textDecoration: checkedIndex.includes(index) ? 'line-through' : 'none' }}>{body[index]}</p>
                                </div> */}
                                <div>
                                    <p style={{ textDecoration: checkedIndex.includes(index) ? 'line-through' : 'none' }}>{date[index].toString().slice(0, 10)}</p>
                                </div>
                                <div className='textBody2'>
                                    <DeleteIcon style={{ color: 'red' }} onClick={() => deleteToDo(id[index])} />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ToDoList;
