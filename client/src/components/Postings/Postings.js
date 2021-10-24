import React from 'react';
//import component
import Posting from './Posting';
import './Postings.css';

const Postings = ({ filteredData }) => {

    return (
        <div className="posting-container">
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Comapny Name</th>
                        <th>Location</th>
                        <th>Work Type</th>
                        <th>Job Condition</th>
                        <th>Job Description</th>
                        <th>Post Date</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {filteredData.map((post) => (
                        <Posting
                            post={post}
                            key={post._id}
                        />

                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Postings;