import React from 'react';
import { Tweet } from 'react-tweet';
import './Tweets.css';


function Tweets() {
  
  return (
    <div className="tweet-container">
      <h1>Crypto News</h1>
        <div className="tweet-box">
          <Tweet id="1883100021639274974" />
          <Tweet id="1882524283928530969" />
          <Tweet id="1883227588140704151" />
          <Tweet id="1883227588140704151" />
        </div>
    </div>
  );
  
}

export default Tweets;