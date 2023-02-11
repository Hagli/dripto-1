import React from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Vigenere from './pages/vigenere';
import AutoVigenere from './pages/auto-key-vigenere';
import ExtVigenere from './pages/ext-vigenere';
import Affine from './pages/affine';
import Playfair from './pages/playfair';
import Hill from './pages/hill';

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
    <Routes>
        <Route index element={<Vigenere/>} />
        <Route path='/vigenere' exact element={<Vigenere/>} />
        <Route path='/auto-key-vigenere' exact element={<AutoVigenere/>} />
        <Route path='/ext-vigenere' exact element={<ExtVigenere/>} />
        <Route path='/affine' exact element={<Affine/>} />
        <Route path='/playfair' exact element={<Playfair/>} />
        <Route path='/hill' exact element={<Hill/>} />
        <Route path='*' element={<Vigenere/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
