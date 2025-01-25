import React from 'react';
import { Tweet } from 'react-tweet';
import './App.css';


function App() {
  
  return (
    <div className="App">
      <h1>Twitter Feed</h1>
        <div className="tweet-box">
          <Tweet id="1883100021639274974" />
          <Tweet id="1882524283928530969" />
          <Tweet id="1883227588140704151" />
          
        </div>
    </div>
  );
  
}

export default App;


