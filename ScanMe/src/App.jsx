import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddedItemsProvider } from './components/context/AddedItemsContext';
import LandingPage from './pages/LandingPage/Landingpage'
import AddedItems from './components/AddedItems/AddedItems';
import MenuDetails from './pages/MenuDetails/MenuDetails';
import './App.css'

const App = () => {
  return (
    <AddedItemsProvider>
      
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/added-items" element={<AddedItems />} />
        </Routes>
     
    </AddedItemsProvider>
  );
};

export default App;
