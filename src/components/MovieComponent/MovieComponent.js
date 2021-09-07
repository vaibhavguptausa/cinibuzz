import moment from 'moment';
import React from 'react';
import { BaseImageUrl } from '../../utilities/Constants';
import styles from './MovieComponent.module.css';

const MovieComponent = (props) => {
  return (
    <div className={styles.MovieComponent}>
      <div className={styles.Picture}>
        <img height="360px" width="256px" src={`${BaseImageUrl}${props.path}`}></img>
      </div>
      <div className={styles.MovieName}>{props.name}</div>
      <div className={styles.MovieDate}>{moment(props.releaseDate,'YYYY-MM-DD').format('DD MMM YYYY')}</div>

    </div>
  )
};

MovieComponent.propTypes = {};

MovieComponent.defaultProps = {};

export default MovieComponent;
