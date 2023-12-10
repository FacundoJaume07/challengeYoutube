import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/common/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <TextField
        style={{ width: '100%' }}
        label="Search for videos..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="contained" onClick={() => onSearch(query)}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
