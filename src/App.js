import './App.css';
import Posts from './posts';
import './index.css';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <section className='container'>
        <Posts />
      </section>
    </React.Fragment>
  );
}

export default App;
