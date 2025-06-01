import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '@/redux/store';
import App from './App';

describe('App Component', () => {
  it('should have a heading element', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
