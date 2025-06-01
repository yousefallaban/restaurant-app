import React, { useState, useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPostcode } from '@/redux/slices/restaurantSlice.js';
import { Input, Button } from '@/ui';

import styles from './Search.module.scss';

const Search = ({ loading }) => {
  const { postcode } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(postcode || '');
  const [validationError, setValidationError] = useState('');
  const id = useId();

  useEffect(() => {
    setInputValue(postcode || '');
  }, [postcode]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setValidationError('Postcode is required');
      return;
    }
    dispatch(setPostcode(inputValue.trim()));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        id={`postcode-${id}`}
        name="postcode"
        type="text"
        placeholder="Enter UK Postcode"
        value={inputValue}
        onChange={handleChange}
        helperText={validationError}
      />
      <Button type="submit" disabled={loading}>
        Search
      </Button>
    </form>
  );
};

export default Search;
