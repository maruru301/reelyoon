import './App.css';

import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import SearchResults from './pages/SearchResults';

function App() {
    return (
        <React.Fragment>
            <Reset />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
            <Footer />
        </React.Fragment>
    );
}

export default App;
