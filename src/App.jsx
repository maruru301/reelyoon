import './App.css';

import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import ContentDetail from './pages/ContentDetail';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import SearchResults from './pages/SearchResults';

function App() {
    return (
        <React.Fragment>
            <Reset />

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/:type/:id" element={<ContentDetail />} />
            </Routes>

            <Footer />
        </React.Fragment>
    );
}

export default App;
