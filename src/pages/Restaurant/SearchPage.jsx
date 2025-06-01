import RestaurantControls from '@/components/Filteres/RestaurantControls.jsx';
import { useFilteredRestaurants } from '@/hooks/useFilteredRestaurants.js';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Dropdown } from '@/ui/index.js';
import NotFound from '@/components/NotFound/NotFound.jsx';
import Pagination from '@/components/Pagination/Pagination.jsx';
import useSyncUrlToRedux from '@/hooks/useSyncUrlToRedux.js';
import Restaurants from '@/components/Restaurants/Restaurants.jsx';
import Sidebar from '@/components/Sidebar/Sidebar.jsx';

import styles from './SearchPage.module.scss';

const SearchPage = () => {
  useSyncUrlToRedux();

  return (
    <div className={styles.gridLayout}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <RestaurantControls />
        <Restaurants />
        <NotFound />
        <Pagination />
      </main>
    </div>
  );
};

export default SearchPage;
