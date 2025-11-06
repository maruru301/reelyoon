import './App.css';

import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import ContentDetail from './pages/ContentDetail';
import Footer from './components/layout/Footer/Footer';
import GenreContents from './pages/GenreContents';
import Header from './components/layout/Header/Header';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollTopButton from './components/common/ScrollTopButton';
import SearchResults from './pages/SearchResults';

function App() {
    return (
        <React.Fragment>
            <Reset />

            <Header />

            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/:type/:id" element={<ContentDetail />} />
                <Route path="/:mediaType/genre/:genreId" element={<GenreContents />} />
            </Routes>

            <Footer />

            <ScrollTopButton />
        </React.Fragment>
    );
}

export default App;
