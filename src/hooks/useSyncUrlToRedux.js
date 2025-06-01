import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPostcode, setPage } from '@/redux/slices/restaurantSlice';

const useSyncUrlToRedux = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const postcode = searchParams.get('postcode') || '';
    const page = Number(searchParams.get('page')) || 1;
    dispatch(setPostcode(postcode));
    dispatch(setPage(page));
  }, [searchParams, dispatch]);
};

export default useSyncUrlToRedux;