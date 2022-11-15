import React from 'react';
import Header from './components/header';
import Footer from './components/footer'
import Phantom from './components/Phantom';
import './css/App.css';

function App() {

  return (
    <div className="App">
      <Header/>
      <Phantom/>
      <Footer/>
    </div>
  );
}

export default App;
