import clsx from 'clsx';
import { debounce, set } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { getGenres, getLatest, getMovieByCategory, getUpcoming, search } from '../../services/MovieService';
import { Categories, DefaultGenre, Endpoints } from '../../utilities/Constants';
import MovieComponent from '../MovieComponent/MovieComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import styles from './HomeComponent.module.css';



const HomeComponent = () => {
  const [categoryMovieList, setCategoryMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(DefaultGenre);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [keyword, setKeyword] = useState("");
  const handleCategoryClick = (event) => {
    let category_temp = event.target.name;
    let parent = event.target.parentElement;
    parent.childNodes.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    event.target.classList.add("active");
    setGenreId(getGenreId(Categories[category_temp]));
    setPage(1);
    setIsSearchResult(false);
    setCategory(category_temp);
    if (category_temp === "NEW_RELEASE") {
      handleNewRelease();
    }
    else if (category_temp === "UPCOMING") {
      handleUpcoming();
    }
    else {
      getMovieByCategory(Endpoints.discover, { page: page, with_genres: getGenreId(Categories[category_temp]) }, (res) => { setCategoryMovieList(movies => [...res]) });
    }
  }

  const getGenreId = (val) => {
    let result = genres.find((elem) => elem.name === val);
    return result?.id;
  }

  const handleNewRelease = () => {
    getUpcoming({ page: page }, setCategoryMovieList);
  }

  const handleUpcoming = () => {
    getUpcoming({ page: page }, setCategoryMovieList);
  }
  const handlerDebounce = useCallback(debounce((a,b)=>search(a,b), 1000), []);
  const handleSearch = (event) => {
    setKeyWord(event);
    if(event===""){
      setCategory('');
      setIsSearchResult(false);
    }
    else{
      setIsSearchResult(true);
      setKeyword(event);
      handlerDebounce({ page: page, query: event }, setCategoryMovieList)
    }
  }

  useEffect(()=>{
    getMovieByCategory(Endpoints.discover, { page: page, with_genres: getGenreId(Categories[category]) }, (res) => { setCategoryMovieList(movies => [...res]) });
  },[category])

  useEffect(() => {
    getGenres(setGenres);
    getMovieByCategory(Endpoints.discover, { page: page, with_genres: getGenreId(Categories[DefaultGenre]) }, (res) => { setCategoryMovieList(movies => [...res]) });
  }, [])
  const toggleHasMore = (data) => {
    if (data.length < 20) {
      setHasMore(false);
    } else setHasMore(true);
  };
  const loadMoreItems = () => {
    getMovieByCategory(Endpoints.discover, { page: page + 1, with_genres: genreId }, (res) => {
      setCategoryMovieList((movies => movies?.concat(res)));
      setPage((page) => page + 1);
      toggleHasMore(res);
    });
  }
  return (
    <div className={styles.HomeComponent}>
      <div className={styles.SearchBox}>
        <div className={styles.BoxTitle}>
          <span className={styles.BoxTitle1}>Find perfect movie for </span>
          <span className={styles.BoxTitle2}>evening</span>
        </div>
        <div><SearchComponent className={styles.SearchComponent} onChange={setKeyWord} onSearch={handleSearch}></SearchComponent></div>
      </div>
      <div className={styles.MovieSection}>
        
        { !isSearchResult ?
            <>
              <div className={styles.BoxTitle}>Browse movies by category</div>
              <div className={`${styles.buttonGroup} btn-group`} role="group" aria-label="Basic example">
                {
                  Object.keys(Categories).map((item, ind) => <button type="button" key={item + '-' + ind} onClick={handleCategoryClick} className={clsx("btn btn-secondary", {
                    'active': (item === category) && !isSearchResult
                  })} id={item} name={item}>{Categories[item]}</button>)
                }
              </div>
            </> :
            <div className={`${styles.BoxTitle}`}>
              <span className={styles.BoxTitle1}>Showing Results for </span>
              <span className={styles.BoxTitle2}>{keyword}</span>
            </div>
          }
        <InfiniteScroll
          hasMoreItems={true}
          itemHeight={300}
          next={loadMoreItems}
          dataLength={categoryMovieList.length}
          hasMore={hasMore}
        >
          <div className={styles.MovieTiles}>
          {categoryMovieList?.map((item, ind) => <Link to={`movie/${item.id}`}><div className={styles.MovieTiles} key={item + '-' + ind}><MovieComponent name={item.original_title} releaseDate={item.release_date} path={item.poster_path}></MovieComponent></div></Link>)}
        </div>
        </InfiniteScroll>

    </div>
    </div >
  );
};

HomeComponent.propTypes = {};

HomeComponent.defaultProps = {};

export default HomeComponent;
