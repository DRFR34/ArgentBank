import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import './SearchBar.scss';

/**
 * Component for searching through the transactions data.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.searchValue - The current value of the search input.
 * @param {Function} props.setSearchValue - Function to update the search input value.
 * @param {Function} props.onSearchClick - Function to handle the search button click.
 * @returns {JSX.Element} The SearchBar component.
 */
export default function SearchBar({ searchValue, setSearchValue, onSearchClick }) {
    return (
        <div className='searchWrapper'>
            <form className="searchWrapper__form">
                <div className="searchWrapper__form__itemBox">
                    <label htmlFor="searchInput">Search: </label>
                    <input
                        id="searchInput"
                        className="searchWrapper__form__input"
                        name='searchInput'
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="searchWrapper__form__btn"
                        type="button"
                        onClick={onSearchClick}
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
}

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    onSearchClick: PropTypes.func.isRequired,
};
