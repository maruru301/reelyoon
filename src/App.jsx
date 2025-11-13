import './App.css';

import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import ContentDetail from './pages/ContentDetailPage';
import ContentListPage from './pages/ViewAllPage';
import Footer from './components/layout/Footer/Footer';
import GenreContents from './pages/GenreContentsPage';
import Header from './components/layout/Header/Header';
import Home from './pages/HomePage';
import { Reset } from 'styled-reset';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollTopButton from './components/common/ScrollTopButton';
import SearchResults from './pages/SearchResultsPage';

function App() {
    return (
        <React.Fragment>
            <Reset />

            <Header />

            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/detail/:type/:id" element={<ContentDetail />} />
                <Route path="/:mediaType/genre/:genreId/:genreSlug" element={<GenreContents />} />
                <Route path="/:mediaType/:category" element={<ContentListPage />} />
            </Routes>

            <Footer />

            <ScrollTopButton />
        </React.Fragment>
    );
}

export default App;
