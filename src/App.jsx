import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { RestaurantSearchPage } from '@/pages/Index.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/restaurants" replace />} />
      <Route path="/restaurants" element={<RestaurantSearchPage />} />
    </Routes>
  );
}

export default App;
