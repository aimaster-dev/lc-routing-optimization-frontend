import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CSVUpload from './screens/CSVUpload';
import HomeScreen from './screens/Home';
import { useState, useEffect } from 'react';

function App() {
  const [routesData, setRoutesData] = useState(() => {
    const savedData = localStorage.getItem('routesData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    //console.log(JSON.stringify(routesData),"rOUTE DATA");
    if (routesData?.length > 0) {
      localStorage.setItem('routesData', JSON.stringify(routesData));
    }
  }, [routesData]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route 
          path="/" 
          element={<CSVUpload setRoutesData={setRoutesData} />} 
        />
        <Route 
          path="/home" 
          element={<HomeScreen routesData={routesData} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
