import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
// import { Tweet } from 'react-tweet';
import './App.css'; 


const PChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const data = [
      { name: 'Null', perecent: 0 },
      { name: 'BTC', percent: 20 },
      { name: 'ETH', percent: 30 },
      { name: 'SOL', percent: 10 },
      { name: 'SPNGBOB', percent: 40 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const onPieEnter = (_, index) => {
      setActiveIndex(index);
  };

/*
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
*/

  return (
        
    
    <div style={{

      position: 'absolute',  // Enables precise positioning
      top: '40%',  // Move it up/down
      left: '70%',  // Center it horizontally
      transform: 'translate(-50%, -50%)', // Ensures true centering
 
    }}>
      <PieChart width={700} height={700}>
        <Pie
          activeIndex={activeIndex}
          data={data}
          dataKey="percent"
          outerRadius={250}
          fill="green"
          onMouseEnter={onPieEnter}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );

}

export default PChart;
