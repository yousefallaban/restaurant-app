import { useDispatch } from 'react-redux';

import { usePagination } from '@/hooks/usePagination.js';
import { setPage } from '@/redux/slices/restaurantSlice.js';

import styles from './Pagination.module.scss';

export default function Pagination() {
  const dispatch = useDispatch();
  const { page, totalPages, hasPrev, hasNext } = usePagination();

  const goToPage = (newPage) => {
    dispatch(setPage(newPage));
  };

  if (totalPages <= 1) return null;
  return (
    <nav className={styles.container} aria-label="Pagination">
      {hasPrev && (
        <button
          className={styles.controller}
          onClick={() => goToPage(page - 1)}
          disabled={!hasPrev}
        >
          &lt;
        </button>
      )}
      <span className={styles.pageInfo}>
        Page {page} of {totalPages}
      </span>
      {hasNext && (
        <button
          className={styles.controller}
          onClick={() => goToPage(page + 1)}
          disabled={!hasNext}
        >
          &gt;
        </button>
      )}
    </nav>
  );
}
