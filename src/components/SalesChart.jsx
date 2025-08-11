import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', uv: 4000 },
  { name: 'Tue', uv: 3000 },
  { name: 'Wed', uv: 2000 },
  { name: 'Thu', uv: 2780 },
  { name: 'Fri', uv: 1890 },
];

const SalesChart = () => {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
