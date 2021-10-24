import React, {useState} from 'react';
import axios from 'axios';

const Posting = ({post}) => {
    const [jobtitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [worktype, setWorkTypoe] = useState('');
    const [jobcondition, setJobcondition] = useState('');
    const [jobdescription, setJobdescription] = useState('');
    const [postdate, setPostDate] = useState('');
    const [tags, setTags] = useState([]);

    const [toggle, setToggle] = useState(true);

    const toggleHandler = () => {
        setToggle(false);
    }

    const jobtitleHandler = (e) => {setJobTitle(e.target.value)};
    const locationHandler = (e) => { setLocation(e.target.value) };
    const worktypeHandler = (e) => { setWorkTypoe(e.target.value) };
    const jobconditionHandler = (e) => { setJobcondition(e.target.value) };
    const jobdescriptionHandler = (e) => { setJobdescription(e.target.value) };
    const postdateHandler = (e) => { setPostDate(e.target.value) };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTags([...tags, e.target.value]);
        }
    }

    const updateHandler = async() => {
        const job_title = jobtitle ? jobtitle : post.jobtitle;
        const _location = location ? location : post.location;
        const work_type = worktype ? worktype : post.worktype;
        const job_condition = jobcondition ? jobcondition : post.jobcondition;
        const job_description = jobdescription ? jobdescription : post.jobdescription;
        const post_date = postdate ? postdate : post.postdate;
        const t = post.tags;
        let _tags;
        t.push(...tags);
        if (t[0] === ''){
            _tags = t.slice(1, t.length);
        }else{
            _tags = t.slice(0, t.length);;
        }
        


        await axios.put(`http://18.220.70.6:8000/posts/${post._id}`, 
        {
            jobtitle: job_title,
            location: _location,
            worktype: work_type,
            jobcondition: job_condition,
            jobdescription: job_description,
            postdate: post_date,
            tags: _tags
        }
        ).then(response => {
            console.log(response.data);
            window.location.reload(false); 
        }).catch(error => {
            console.log('Error getting fake data: ' + error);
        });
    }

    const deleteHandler = async() => {
        await axios.delete(`http://18.220.70.6:8000/posts/${post._id}`)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log('Error getting fake data: ' + error);
        });
    }
    
    const softdeleteHandler = async() => {
        await axios.put(`http://18.220.70.6:8000/posts/softdelete/${post._id}`, 
        {
            deleted: true
        })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log('Error getting fake data: ' + error);
        });
    }

    return(
        <tr>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.jobtitle}</span>
                ) : (
                    <textarea defaultValue={post.jobtitle} onChange={jobtitleHandler}></textarea>
                )}
            </td>
            <td>
                {
                    post.companylink ? <a href={post.companylink}>{post.company}</a> : <span>{post.company}</span>
                }</td>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.location}</span>
                ) : (
                        <textarea defaultValue={post.location} onChange={locationHandler}></textarea>
                )}
            </td>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.worktype}</span>
                ) : (
                        <textarea defaultValue={post.worktype} onChange={worktypeHandler}></textarea>
                )}
            </td>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.jobcondition}</span>
                ) : (
                        <textarea defaultValue={post.jobcondition} onChange={jobconditionHandler}></textarea>
                )}
            </td>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.jobdescription}</span>
                ) : (
                        <textarea defaultValue={post.jobdescription} onChange={jobdescriptionHandler}></textarea>
                )}
            </td>
            <td>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>{post.postdate}</span>
                ) : (
                        <textarea defaultValue={post.postdate} onChange={postdateHandler}></textarea>
                )}
            </td>
            <td>
                <div>
                    <ul>
                        {tags.map((tag) => {return <li key={tag}>{tag}</li>})}
                    </ul>
                </div>
                {toggle ? (
                    <span onDoubleClick={toggleHandler}>
                        {post.tags.map((tag) => { return <li key={tag}>{tag}</li> })}
                    </span>
                ) : (
                    <input type="text" onKeyDown={handleKeyDown}></input>
                )}
            </td>
            <td className="actions">
                <button onClick={updateHandler}>Update</button>

                <button onClick={deleteHandler}>Delete</button>

                <button onClick={softdeleteHandler}>Soft Delete</button>
            </td>
        </tr>
    );
}

export default Posting;