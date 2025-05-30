import * as useRestaurants from '@/hooks/useRestaurants.js';

jest.mock('@/hooks/useRestaurants.js', () => ({
  useRestaurantSearch: jest.fn(),
}));

const mockFetchRestaurants = jest.fn();
const mockResetError = jest.fn();

beforeEach(() => {
  useRestaurants.useRestaurantSearch.mockReturnValue({
    loading: false,
    error: null,
    fetchRestaurants: mockFetchRestaurants,
    resetError: mockResetError,
  });
  mockFetchRestaurants.mockClear();
  mockResetError.mockClear();
});

import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  it('renders input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/Enter UK postcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows validation error if input is empty and button is clicked', () => {
    render(<Search />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByText(/Postcode is required/i)).toBeInTheDocument();
    expect(mockFetchRestaurants).not.toHaveBeenCalled();
  });

  it('calls fetchRestaurants with trimmed input when form is submitted', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/Enter UK postcode/i);
    fireEvent.change(input, { target: { value: '  EC1A 1BB  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockFetchRestaurants).toHaveBeenCalledWith('EC1A 1BB');
  });

  it('disables button when loading', () => {
    useRestaurants.useRestaurantSearch.mockReturnValue({
      loading: true,
      error: null,
      fetchRestaurants: mockFetchRestaurants,
      resetError: mockResetError,
    });
    render(<Search />);
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('calls resetError if fetchError exists and input changes', () => {
    useRestaurants.useRestaurantSearch.mockReturnValue({
      loading: false,
      error: 'Something bad happened',
      fetchRestaurants: mockFetchRestaurants,
      resetError: mockResetError,
    });
    render(<Search />);
    const input = screen.getByPlaceholderText(/Enter UK postcode/i);
    fireEvent.change(input, { target: { value: 'SW1A 1AA' } });
    expect(mockResetError).toHaveBeenCalled();
  });
});
