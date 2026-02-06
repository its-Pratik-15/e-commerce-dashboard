import AppRoutes from './routes/AppRoutes';
import { FilterProvider } from './context/FilterContext';
import './index.css';

function App() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AppRoutes />
      </div>
    </FilterProvider>
  );
}

export default App;
