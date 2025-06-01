import { Dropdown } from '@/ui/index.js';
import React from 'react';

import NotFound from '@/components/NotFound/NotFound.jsx';
import Pagination from '@/components/Pagination/Pagination.jsx';
import useSyncUrlToRedux from '@/hooks/useSyncUrlToRedux.js';
import Restaurants from '@/components/Restaurants/Restaurants.jsx';
import Sidebar from '@/components/Sidebar/Sidebar.jsx';
import RestaurantFilter from '@/components/Filteres/RestaurantFilter.jsx';

import styles from './SearchPage.module.scss';

const SearchPage = () => {
  useSyncUrlToRedux();

  return (
    <div className={styles.gridLayout}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <RestaurantFilter />
          <Dropdown />
        </div>
        <Restaurants />
        <NotFound />
        <Pagination />
      </main>
    </div>
  );
};

export default SearchPage;
