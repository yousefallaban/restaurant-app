import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Search from './Search';
import { setPostcode } from '@/redux/slices/restaurantSlice';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Search component', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = mockStore({
      restaurants: {
        postcode: '',
        loading: false,
      },
    });
    dispatch = jest.fn();
    store.dispatch = dispatch;
  });

  function renderWithProvider(ui) {
    return render(<Provider store={store}>{ui}</Provider>);
  }

  it('renders input and button', () => {
    renderWithProvider(<Search />);
    expect(screen.getByPlaceholderText(/Enter UK Postcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows validation error if input is empty and button is clicked', () => {
    renderWithProvider(<Search />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByText(/Postcode is required/i)).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('dispatches setPostcode with trimmed input on submit', () => {
    renderWithProvider(<Search />);
    const input = screen.getByPlaceholderText(/Enter UK Postcode/i);
    fireEvent.change(input, { target: { value: '  EC1A 1BB  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(dispatch).toHaveBeenCalledWith(setPostcode('EC1A 1BB'));
  });

  it('disables button when loading', () => {
    store = mockStore({
      restaurants: {
        postcode: '',
        loading: true,
      },
    });
    // Override dispatch again for new store instance
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Search loading={true} />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });
});
