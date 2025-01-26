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
const pdata = [
    { name: "MongoDb", student: 11, fees: 120 },
    { name: "Javascript", student: 15, fees: 12 },
    { name: "PHP", student: 5, fees: 10 },
    { name: "Java", student: 10, fees: 5 },
    { name: "C#", student: 9, fees: 4 },
    { name: "C++", student: 10, fees: 8 },
];

function Graph() {
    return (
        <div className="graph-container"> {/* Apply new positioning class */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pdata} margin={{ right: 30 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="student" stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph;