import React, { useState, useEffect } from 'react';
import './Graph.css'; 
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

// Sample chart data
// const pdata = [
//     { name: "2025-01-26T00:46:39.941Z", amount: 134.7624},
//     { name: "2025-01-28T00:46:50.131Z", amount: 140 }
// ];

function Graph() {
  const [pdata, setPdata] = useState([]);

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookieArr = document.cookie.split(';'); // Split the cookies string into individual cookies
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim(); // Remove any leading or trailing spaces
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1); // Extract the value after the '=' sign
        }
    }
    return null; // Return null if the cookie is not found 
  };

  const userId = (getCookie('userId') === 'null' || !getCookie('userId')) ? '12345' : getCookie('userId'); // TODO: dynamically fetch the actual userId
  
  const fetchHistory = async () => {
    try {
      const response = await fetch(`https://geesehacks.onrender.com/user/${userId}/history`);
      const result = await response.json();

      // Transform the API response to the required format
      const transformedData = result.history.map(([name, amount]) => ({
        name,
        amount: parseFloat(amount),
      }));

      setPdata(transformedData);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
      <div className="graph-container"> {/* Apply new positioning class */}
          <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pdata} margin={{ right: 30 }}>
                  <CartesianGrid />
                  <XAxis dataKey="name" interval={"preserveStartEnd"} />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                  <Line dataKey="amount" name="Total Portfolio Amount (USD)" stroke="black" activeDot={{ r: 8 }} />
              </LineChart>
          </ResponsiveContainer>
      </div>
  );
}

export default Graph;