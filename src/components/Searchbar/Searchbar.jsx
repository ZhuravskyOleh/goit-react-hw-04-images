import { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Searchbar.styled';
import { FaSearch, FaRegWindowClose } from 'react-icons/fa';

function Searchbar({ onSubmit, isDisabled }) {
  const [value, setValue] = useState('');

  const handlerSubmit = e => {
    e.preventDefault();
    setValue('');
    const word = e.target.elements[1].value.trim();
    if (word) onSubmit(word);
  };

  return (
    <Header>
      <form onSubmit={handlerSubmit}>
        <button type="submit" disabled={isDisabled}>
          <FaSearch size={20} className="icon" />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setValue(e.target.value)}
          value={value}
        />

        <button onClick={() => setValue('')} type="reset">
          <FaRegWindowClose
            className="icon"
            size={20}
            color={value ? 'red' : 'transparent'}
          />
        </button>
      </form>
    </Header>
  );
}

Searchbar.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
