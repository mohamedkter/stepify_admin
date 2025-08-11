import { Card, Row, Col, Typography } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

// Dummy chart data
const chartData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

export default function Dashboard() {
  return (
    <div>
      {/* Title */}
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      {/* Stats cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <ShoppingCartOutlined style={{ fontSize: 32, color: "#1890ff" }} />
            <h3>Orders</h3>
            <p style={{ fontSize: 24, margin: 0 }}>1,245</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <UserOutlined style={{ fontSize: 32, color: "#52c41a" }} />
            <h3>Customers</h3>
            <p style={{ fontSize: 24, margin: 0 }}>3,276</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <DollarOutlined style={{ fontSize: 32, color: "#faad14" }} />
            <h3>Revenue</h3>
            <p style={{ fontSize: 24, margin: 0 }}>$56,789</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <LineChartOutlined style={{ fontSize: 32, color: "#eb2f96" }} />
            <h3>Growth</h3>
            <p style={{ fontSize: 24, margin: 0 }}>+15%</p>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card style={{ marginTop: 24 }}>
        <h3>Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#1890ff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
