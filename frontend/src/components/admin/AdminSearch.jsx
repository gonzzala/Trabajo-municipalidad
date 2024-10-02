// UserSearch.js
import React, { useState } from 'react';

const UserSearch = ({ onSearch }) => {
  const [searchDNI, setSearchDNI] = useState('');

  const handleSearch = () => {
    onSearch(searchDNI);
  };

  return (
    <div>
      <h4>Buscar Usuario por DNI:</h4>
      <div>
        <input
          type="text"
          placeholder="Ingrese el DNI"
          value={searchDNI}
          onChange={(e) => setSearchDNI(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default UserSearch;
