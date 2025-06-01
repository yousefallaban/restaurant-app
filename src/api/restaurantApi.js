import fetcher from './fetcher.js';
import { BASE_ENDPOINT } from '@/constant.js';

export async function fetchRestaurantsByPostcode(postcode, signal) {
  const cleanedPostcode = postcode.replace(/\s+/g, '');

  try {
    return await fetcher({
      endpoint: `${BASE_ENDPOINT}${cleanedPostcode}`,
      method: 'GET',
      signal,
    });
  } catch (error) {
    throw new Error(
      `Failed to fetch restaurants for postcode "${postcode}": ${error.message}`
    );
  }
}
