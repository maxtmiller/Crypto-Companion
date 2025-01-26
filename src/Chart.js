import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import './Chart.css'; 


const Chart = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const userId = '12345'; // TODO: dynamically fetch the actual userId

  const COLORS = ['#858c96', '#92b1f4', '#3c4758', '#B8CDE8'];

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`https://geesehacks.onrender.com/user/${userId}/portfolio`);
      const result = await response.json();

      // Transform the API response to the required format
      const transformedData = result.portfolio.map(([name, percent]) => ({
        name,
        percent: parseFloat(percent),
      }));

      setData(transformedData);


      


    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const onPieEnter = (_, index) => {
      setActiveIndex(index);
  };

  return (



    <div className="chart-box">

      <div className="pie-container">
        <PieChart width={350} height={350}>
          <Pie
            activeIndex={activeIndex}
            data={data}
            dataKey="percent"
            outerRadius={175}
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
    </div>
  );

}

export default Chart;
