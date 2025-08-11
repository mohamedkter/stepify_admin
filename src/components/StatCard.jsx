import { Card } from 'antd';

const StatCard = ({ title, value, color }) => {
  return (
    <Card style={{ background: color, color: '#fff', borderRadius: 8 }}>
      <p style={{ margin: 0 }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </Card>
  );
};

export default StatCard;
