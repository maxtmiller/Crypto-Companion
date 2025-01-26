import React from 'react';
import { Tweet } from 'react-tweet';
import './Tweets.css';


function Tweets() {
  
  return (
    <div className="tweet-box">
      
        <div className="tweet-container">
          <Tweet id="1883100021639274974" />
          <Tweet id="1882524283928530969" />
          <Tweet id="1883227588140704151" />
          <Tweet id="1882898537526239731" />
          <Tweet id="1883519636198891697" />
          <Tweet id="1882871076230730240" />
        </div>
    </div>
  );
  
}

export default Tweets;