import './App.css';

import * as React from 'react';

import Home from './pages/Home';
import { Reset } from 'styled-reset';

function App() {
    return (
        <React.Fragment>
            <Reset />
            <Home />
        </React.Fragment>
    );
}

export default App;
