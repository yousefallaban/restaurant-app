import React from 'react';

import Search from '@/components/Search/Search.jsx';
import Sidebar from '@/components/Sidebar/Sidebar.jsx';

import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <div className={styles.gridLayout}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <Search />
      </main>
    </div>
  );
};

export default SearchPage;
