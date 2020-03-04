import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container } from 'reactstrap';
import { BibNavBar } from './BibNavBar';
import { BibSearch } from './BibSearch';

function App() {
    return (
        <div>
            <Container className="themed-container" fluid="md">
                <BibNavBar></BibNavBar>
                <BibSearch />
            </Container>
            
        </div>

    );
}

export default App;
