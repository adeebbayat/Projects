import React, { useState, FC } from 'react';
import axios from 'axios';
import { format, setDate } from 'date-fns';

interface AddToDoTaskProps {
    refreshPage: () => void;
}

const AddToDoTask: FC<AddToDoTaskProps> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/create', { title, body, date})
            .then((response: any) => {
                console.log(response);
                props.refreshPage(); // Call the refreshPage function after successful form submission
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
                {/* <label>
                    <input type="text" className="form-control" placeholder='Enter Body' value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <br /> <br /> */}
                <label>
                    <input type="date" className="form-control" onChange = {(e) => setDate(e.target.value)}/>
                </label>
                <br /> <br />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
        </>
    );
};

export default AddToDoTask;
