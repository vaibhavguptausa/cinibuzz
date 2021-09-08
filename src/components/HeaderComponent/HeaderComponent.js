import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderComponent.module.css';
import { Link } from 'react-router-dom';

const HeaderComponent = () => (
  <div className={styles.HeaderComponent}>
    <Link to='/'><div className={styles.Cinibuzz}>Cinibuzz</div></Link>
    <ul className={styles.LinkContainer}>
      <li><Link to='/'>Movies</Link></li>
      <li><Link to='/tvshows'>TV Shows</Link></li>
      <li><Link to='/kids'>Kids</Link></li>
    </ul>
  </div>
);

HeaderComponent.propTypes = {};

HeaderComponent.defaultProps = {};

export default HeaderComponent;
