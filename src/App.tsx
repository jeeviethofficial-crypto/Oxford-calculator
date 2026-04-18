import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ScientificCalculator } from './features/ScientificCalculator';
import { MatrixCalculator } from './features/MatrixCalculator';
import { GraphingCalculator } from './features/GraphingCalculator';
import { Calculator, Grid, LineChart, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-200">
        <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Calculator size={28} />
              Oxford Advanced Calculator
            </h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row gap-6">
          <nav className="md:w-64 flex-shrink-0 flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Calculator size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Scientific Mode</span>
            </Link>
            <Link to="/matrix" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Grid size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Matrix Mode</span>
            </Link>
            <Link to="/graph" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <LineChart size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Graphing Mode</span>
            </Link>
          </nav>
          
          <div className="flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 min-h-[500px]">
            <Routes>
              <Route path="/" element={<ScientificCalculator />} />
              <Route path="/matrix" element={<MatrixCalculator />} />
              <Route path="/graph" element={<GraphingCalculator />} />
            </Routes>
          </div>
        </main>
        
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Designed for Oxford University Students &bull; 
          <a href="#" className="mx-2 hover:underline">Documentation</a> &bull; 
          <a href="#" className="mx-2 hover:underline">Report Issue</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
