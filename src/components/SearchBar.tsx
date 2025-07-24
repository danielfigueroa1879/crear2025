import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Buscar procedimientos..."
                className="search-input"
            />
            <button type="submit" className="search-button">Buscar</button>
        </form>
    );
};

export default SearchBar;