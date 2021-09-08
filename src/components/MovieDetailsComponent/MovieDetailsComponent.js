import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieDetailsComponent.module.css';
import { useParams } from 'react-router-dom';
import { getCredits, getMovieDetails, getRecommendations } from '../../services/MovieService';
import { BaseImageUrl, BaseImageUrlOriginal } from '../../utilities/Constants';
import moment from 'moment';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const MovieDetailsComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const id = useParams();
  useEffect(() => {
  })
  useEffect(() => {
     getMovieDetails(id.id, setDetails); 
     getCredits(id.id, setCredits) 
     getRecommendations(id.id,setRecommendations);
    }, []);
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
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className={`carousel-button-group ${styles.buttonGroup}`}>
        <button className={currentSlide === 0 ? `${styles.disable} ${styles.prevButton}`  : `${styles.prevButton}`} onClick={() => previous()} ></button>
        <button onClick={() => next()} className={styles.nextButton}></button>
        {/* <button onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </button> */}
      </div>
    );
  };
  const Cast = () => {
    var elem = credits !== null ? credits.cast.map((item) =>
      <div><div className={styles.CastProfilePic}><img src={`${BaseImageUrlOriginal}${item.profile_path}`} height="322px" width="256px" /></div><div className={styles.key}>{item.name}</div><div className={styles.value}>{item.character}</div></div>) : <div></div>
    return elem;
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
      <div className={`${styles.ContentRow1} row`}>
        <div className="col-lg-8">
          <div className={styles.Overviewheading}>Overview</div>
          <div className={styles.Overview}>
            {details?.overview}
          </div>
          <div className="row">{credits?.crew?.map((elem) => { if (elem.job === 'Director' || elem.job === 'Screenplay') return (<div class="col-lg-2"><div className={styles.key}>{elem.name}</div><div className={styles.value}>{elem.job}</div></div>) })}</div>
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
      <div className={styles.Line}></div>
      <div className={styles.contentRow2}>
        
        {
          <div className={styles.CaraouselContainer} >
            <div className={styles.contenrRow2Header}>Cast</div>
            <Carousel
              responsive={responsive}
              renderButtonGroupOutside={true}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {credits !== null ? credits.cast.map((item,ind) =>
                <><div className={styles.CastProfilePic}><img src={`${BaseImageUrlOriginal}${item.profile_path}`} key={item.name+ind} height="322px" width="256px" /></div><div className={styles.key}>{item.name}</div><div className={styles.value}>{item.character}</div></>) : <div></div>
              }
            </Carousel>
          </div>
        }

      </div>
      <div className={styles.contentRow3}>
        
        {
          <div className={styles.CaraouselContainer} >
            <div className={styles.contenrRow2Header}>Recommendations</div>
            <Carousel
              responsive={responsive}
              renderButtonGroupOutside={true}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {recommendations!== null ? recommendations.map((item,ind) =>
                <><div className={styles.CastProfilePic}><img src={`${BaseImageUrlOriginal}${item.backdrop_path}`} key={item.name+ind} height="174px" width="348px" /></div><div className={styles.key}>{item.original_title}</div></>) : <></>
              }
            </Carousel>
          </div>
        }

      </div>

    </div>
  );

}
MovieDetailsComponent.propTypes = {};

MovieDetailsComponent.defaultProps = {};

export default MovieDetailsComponent;
