import React, { useState } from 'react';
import axios from 'axios';

const AddToDoTask = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/create', { title, body })
            .then(response => {
                console.log(response);
                props.refreshPage(); // Call the refreshPage function after successful form submission
                setTitle('');  // Clear the form fields
                setBody('');
            })
            .catch(error => {
                console.log(error);
                // handle the error, such as displaying an error message
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" className="form-control" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br /><br />
                <label>
                    <input type="text" className="form-control" placeholder='Enter Body'value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <br /> <br />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
        </>
    );
};

export default AddToDoTask;