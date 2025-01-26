import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import './Chart.css'; 


const Chart = () => {
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

  return (
        
    <div className="pie-container" >
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          data={data}
          dataKey="percent"
          outerRadius={200}
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

export default Chart;
