import React, { useState, FC } from 'react';
import axios from 'axios';
import { format, setDate } from 'date-fns';


const AddToDoTask = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/create', { title, body, date})
            .then((response: any) => {
                console.log(response);
                setTitle('');  // Clear the form fields
                setBody('');
            })
            .catch((error: any) => {
                console.log(error);
                // handle the error, such as displaying an error message
            });
            
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" className="form-control" placeholder='Enter Task' value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br /><br />
                <label>
                    <input type="date" className="form-control" value = {date} onChange={(e) => setDate(e.target.value)}/>
                </label>
                <br /> <br />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
        </>
    );
};

export default AddToDoTask;