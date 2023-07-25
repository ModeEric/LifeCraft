// App.js
import React from 'react';
import Weather from './components/Weather';
import Mood from './components/Mood';
import Activities from './components/Activities';
import "./App.css"
function App() {
  return (
    <div className="App">
      <header>
        <h1>Self-Care Dashboard</h1>
      </header>
      <main>
        <Weather />
        <Mood />
        <Activities />
      </main>
      <footer>
        {/* Any footer information you'd like */}
      </footer>
    </div>
  );
}

export default App;
