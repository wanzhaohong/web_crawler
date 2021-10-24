import React, {useState, useEffect} from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Postings from './components/Postings/Postings';
import axios from 'axios';
import './App.css';

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

  const [inputText, setInpuText] = useState(query || "");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    axios.get('http://18.220.70.6:8000/posts')
      .then(response => {
        const jobposts = response.data.filter((d) => d.deleted !== true);
        setAllData(jobposts);
        setFilteredData(jobposts);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, [filteredData]);

  useEffect(() => {
    let result = filterPosts(allData, inputText);
    setFilteredData(result);
  }, [inputText, allData]);

  const filterPosts = (posts, input) => {
    if (!input) {
      return posts;
    }
    return posts.filter((post) => {
      const jobtitle = post.jobtitle[0].toLowerCase();
      const company = post.company[0].toLowerCase();
      const location = post.location[0].toLowerCase();
      const worktype = post.worktype[0].trim().toLowerCase();
      const jobcondition = post.jobcondition[0].trim().toLowerCase();
      const jobdescription = post.jobdescription[0].trim().toLowerCase();
      const tags = post.tags;
      return jobtitle.includes(input) || company.includes(input) || location.includes(input) || worktype.includes(input) || jobcondition.includes(input) || jobdescription.includes(input) || tags.includes(input);
    });
  };

  

  return (
    <div className="App">
      <h1 className="title">Search job post</h1>
      <SearchBar inputText={inputText} setInpuText={setInpuText}/>
      <Postings filteredData={filteredData} setFilteredData={setFilteredData}/>
    </div>
  );
}

export default App;
