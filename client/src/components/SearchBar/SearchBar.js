import React from 'react';

import './SearchBar.css';

const SearchBar = ({ inputText, setInpuText}) => {
    
    return(
        <form action="/" method="get" className="search-form" autoComplete="off">
            <input
                type="text"
                id="header-search"
                placeholder="Enter keywords"
                name="s"
                onInput={e => setInpuText(e.target.value)}
                value={inputText}
            />
        </form>
    );
    
}

export default SearchBar;
