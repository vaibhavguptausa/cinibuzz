import React, { useState } from 'react';
import styles from './SearchComponent.module.css';

const SearchComponent = (props) => {
    const handleClick = (event)=>{
        props.onSearch(event.target.value);
    }

    return (
        <div className={styles.SearchComponent} >
            <div className={`${styles.SearchContainer}`} >
                <input type="search" placeholder="Search movies" onChange={handleClick} onKeyPress={handleClick}/>
                < span id="search-addon" >
                    <img src={require('../../assets/search-icon.svg').default} alt='mySvgImage' />
                </span>
            </div>
            <button className={`${styles.SearchButton} btn btn-primary`} onClick={handleClick}>Search</button>
        </div>
    )
};

SearchComponent.propTypes = {};

SearchComponent.defaultProps = {};

export default SearchComponent;