import React, { useEffect, useState, useId } from 'react';
import { useRestaurantSearch } from '@/hooks/useRestaurants.js';
import { Input, Button } from '../../ui';

import styles from './Search.module.scss';

const Search = () => {
  const [postcode, setPostcode] = useState('');
  const [validationError, setValidationError] = useState('');
  const {
    loading,
    error: fetchError,
    fetchRestaurants,
    resetError,
  } = useRestaurantSearch();
  const id = useId();

  useEffect(() => {
    if (fetchError) {
      resetError();
    }
  }, [postcode]);

  const handleChange = (e) => {
    setPostcode(e.target.value);
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postcode.trim()) {
      setValidationError('Postcode is required');
      return;
    }

    fetchRestaurants(postcode.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        id={`postcode-${id}`}
        name="postcode"
        type="text"
        placeholder="Enter UK postcode (e.g. EC1A 1BB)"
        value={postcode}
        onChange={handleChange}
        helperText={validationError}
      />
      <Button type="submit" disabled={loading}>
        Search
      </Button>
    </form>
  );
};
export default Search
