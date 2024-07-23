import React from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.scss';

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
