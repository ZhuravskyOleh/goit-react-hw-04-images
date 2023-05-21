import { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Searchbar.styled';
import { FaSearch, FaRegWindowClose } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    value: '',
  };

  onReset = () => this.setState({ value: '' });

  handlerSubmit = e => {
    e.preventDefault();
    this.setState({ value: '' });
    const searchValue = e.target.elements[1].value.trim();
    if (searchValue) this.props.onSubmit(searchValue);
  };

  onChange = e => this.setState({ value: e.target.value });

  render() {
    const { value } = this.state;
    return (
      <Header>
        <form onSubmit={this.handlerSubmit}>
          <button type="submit" disabled={this.props.isDisabled}>
            <FaSearch size={20} className="icon" />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={value}
          />

          <button onClick={this.onReset} type="reset">
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
}

Searchbar.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
