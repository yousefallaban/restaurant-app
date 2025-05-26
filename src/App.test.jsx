import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should have a heading element', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
