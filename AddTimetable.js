import React, { useState } from 'react';
import axios from 'axios';

const AddTimetable = () => {
    const [section, setSection] = useState('');
    const [className, setClassName] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Create the timetable entry object
        const timetableEntry = { className, time, day };

        try {
            // Send the data to the backend
            const response = await axios.post(`http://localhost:5000/api/timetable/${section}`, timetableEntry);
            console.log('Response:', response.data);
            alert('Timetable entry added successfully!');
        } catch (error) {
            console.error('Error adding timetable entry:', error);
            alert('Failed to add timetable entry');
        }
    };

    return (
        <div>
            <h1>Add Timetable Entry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Section: </label>
                    <input
                        type="text"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        placeholder="Enter section (A, B, etc.)"
                        required
                    />
                </div>
                <div>
                    <label>Class Name: </label>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter class name"
                        required
                    />
                </div>
                <div>
                    <label>Time: </label>
                    <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Enter class time"
                        required
                    />
                </div>
                <div>
                    <label>Day: </label>
                    <input
                        type="text"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="Enter day"
                        required
                    />
                </div>
                <button type="submit">Add to Timetable</button>
            </form>
        </div>
    );
};

export default AddTimetable;
