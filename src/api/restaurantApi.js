import fetcher from './fetcher.js';

const BASE_ENDPOINT = '/api/discovery/uk/restaurants/enriched/bypostcode/';

export async function fetchRestaurantsByPostcode(postcode, signal) {
  const cleanedPostcode = postcode.replace(/\s+/g, '');

  try {
    const data = await fetcher({
      endpoint: `${BASE_ENDPOINT}${cleanedPostcode}`,
      method: 'GET',
      signal
    });
    return data.restaurants || [];
  } catch (error) {
    throw new Error(`Failed to fetch restaurants for postcode "${postcode}": ${error.message}`);
  }
}
