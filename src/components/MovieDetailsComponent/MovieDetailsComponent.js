import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieDetailsComponent.module.css';
import { useParams } from 'react-router-dom';
import { getCredits, getMovieDetails } from '../../services/MovieService';
import { BaseImageUrl, BaseImageUrlOriginal } from '../../utilities/Constants';
import moment from 'moment';

const MovieDetailsComponent = () => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const id = useParams();
  useEffect(() => {
    console.log('id', id);
  })
  useEffect(() => { getMovieDetails(id.id, setDetails); getCredits(id.id, setCredits) }, []);
  const getGenresString = () => {
    let str = '';
    if (details) {
      details?.genres.map((item, ind) => {
        if (ind != 0)
          str = str + ', ' + item.name;
        else
          str += item.name;
      })
    }
    return str;
  }
  const getTime = () => {
    let time = '';
    time = time + Math.floor((details?.runtime) / 60) + "h ";
    time = time + (details?.runtime) % 60 + "m";
    return time;
  }
  const getDirectorsAndScreenPlay = () => {
    let resultArr=[];
    credits?.crew?.map((elem)=>{
      if(elem.job==='Director' || elem.job==='Screenplay'){
        resultArr.push(elem);
      }
    })
    return resultArr;//.map((elem)=>{<div className="row"><div className={styles.key}>{elem.name}</div><div className={styles.value}>{elem.job}</div></div>})
  }
  return (
    <div className={styles.MovieDetailsComponent}>
      <div className={styles.ImageContainer}>
        <img src={`${BaseImageUrlOriginal}${details?.backdrop_path}`} height="540px" width="1084px"></img>
        <div className={styles.ImageOverlay}>
          <div className={styles.Title}>{details?.original_title}</div>
          <div>
            <span>{moment(details?.release_date, 'YYYY-MM-DD').format('MM/DD/YYYY')}({details?.original_language}) | {getGenresString()} | {getTime()}</span>
          </div>
        </div>
        <div className={styles.UserRating}>
          <div>User<br />Score</div>
          <div className={styles.RoundPercentage}>{details?.vote_average * 10 + '%'}</div>
        </div>
      </div>
      <div class={`${styles.ContentRow1} row`}>
        <div className="col-lg-8">
          <div className={styles.Overviewheading}>Overview</div>
          <div className={styles.Overview}>
            {details?.overview}
          </div>
          <div className="row">{credits?.crew?.map((elem)=>{if(elem.job==='Director' || elem.job==='Screenplay')return(<div class="col-lg-2"><div className={styles.key}>{elem.name}</div><div className={styles.value}>{elem.job}</div></div>)})}</div>
        </div>
        <div className="col-lg-3">
          <div className={styles.key}>Status</div>
          <div className={styles.value}>{details?.status}</div>
          <div className={styles.key}>Original Language</div>
          <div className={styles.value}>{details?.original_language}</div>
          <div className={styles.key}>Budget</div>
          <div className={styles.value}>{details?.budget}</div>
          <div className={styles.key}>Revenue</div>
          <div className={styles.value}>{details?.revenue}</div>
        </div>
      </div>

    </div>
  );

}
MovieDetailsComponent.propTypes = {};

MovieDetailsComponent.defaultProps = {};

export default MovieDetailsComponent;
