import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Chart from './Chart';
import Tweets from './Tweets';
import Graph from './Graph';
import Suggestions from './Suggestions';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Tweets />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Chart />
        <Suggestions />
        <Graph />
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
