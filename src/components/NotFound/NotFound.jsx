import { useSelector } from 'react-redux';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const {
    data: { restaurants = [] },
    loading,
    error,
    postcode,
  } = useSelector((state) => state.restaurants);

  const hasRestaurants = Array.isArray(restaurants) && restaurants.length > 0;
  if (loading || !postcode || hasRestaurants) return null;

  return (
    <div className={styles.container}>
      {error && (
        <p>
          {error.message || 'An error occurred while fetching data.'}
        </p>
      )}

      <h3 className={styles.title}>
        Sorry, we couldn&#39;t find any results for{' '}
        <span className={styles.term}>&#34;{postcode}&#34;</span>
      </h3>
      <p className={styles.subtitle}>
        No places for that postcode. Make sure it’s correct, or try searching a
        different area.
      </p>
    </div>
  );
};
export default NotFound;
