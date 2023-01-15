import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/globalContext';
import Nav from './components/navbar';
import Home from './components/home';
import ManageData from './components/ManageData';

function App() {
  return (
    <>
      <BrowserRouter>
      <GlobalProvider>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/manage_data' element={<ManageData />}/>
          <Route path='/manage_data/:id' element={<ManageData />}/>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
