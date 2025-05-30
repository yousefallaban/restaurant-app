import MockAdapter from 'axios-mock-adapter';
import fetcher, { instance } from './fetcher';

describe('fetcher', () => {
  let mock;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mock = new MockAdapter(instance);
  });

  afterEach(() => {
    mock.restore();
    console.error.mockRestore();
  });

  it('should return response data on success', async () => {
    mock.onAny('/api/data').reply(200, { foo: 'bar' });

    const result = await fetcher({ endpoint: '/api/data' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should handle response errors', async () => {
    mock.onAny('/api/mock-endpoint').reply(404, { error: 'Not found' });

    await expect(fetcher({ endpoint: '/api/404' })).rejects.toEqual(
      expect.objectContaining({
        status: 404,
        message: 'Request failed with status code 404',
      })
    );
  });
});
