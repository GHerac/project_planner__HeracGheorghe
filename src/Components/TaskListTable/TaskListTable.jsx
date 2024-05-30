import './TaskListTable.css';
import React, { useState } from 'react';
import jsonData from '../Data/data.json';

const TaskListTable = () => {
    const [checked, setChecked] = useState(false);
    const [filter, setFilter] = useState(jsonData);


    const handleFilter = (event) => {

        const value = event.target.value;
        const filtered= jsonData.filter(taskItem => taskItem.taskName.includes(value));
        setFilter(filtered);
    }
    return (
        <>
            <input 
                type='checkbox'
                checked={checked}
                id='checkbox_id'
                onChange={() => setChecked(!checked)}
               
            />
            <label for="checkbox_id">Completed</label>
            
            <input 
            type='text'
            onChange={handleFilter}

            />
            <table className='table table-primary table-striped table-responsive m-4'>
                <thead>
                    <tr>
                        <th> Index </th>
                        <th> TaskName </th>
                        <th> Progress Status </th>
                        <th> Completed </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    filter.length && filter.map((taskItem, index) => (
                        (checked && taskItem.done) || !checked ? (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{taskItem.taskName}</td>
                                <td>{taskItem.status}</td>
                                <td>{taskItem.done.toString()}</td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TaskListTable;
