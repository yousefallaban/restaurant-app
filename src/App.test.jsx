import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from '@/redux/store'; // Adjust as needed

describe('App Component', () => {
  it('should have a heading element', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
