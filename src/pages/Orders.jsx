import { Table, Tag, Typography } from "antd";

const { Title } = Typography;

// Generate dummy orders for pagination
const orders = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Pending", "Shipped", "Delivered", "Canceled"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const total = (Math.random() * 500 + 20).toFixed(2);
  return {
    key: i + 1,
    orderId: `ORD-${String(i + 1).padStart(3, "0")}`,
    customer: `Customer ${i + 1}`,
    date: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`,
    total: parseFloat(total),
    status: randomStatus,
  };
});

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Total ($)",
    dataIndex: "total",
    key: "total",
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color;
      switch (status) {
        case "Pending":
          color = "gold";
          break;
        case "Shipped":
          color = "blue";
          break;
        case "Delivered":
          color = "green";
          break;
        case "Canceled":
          color = "red";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

export default function Orders() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Orders
      </Title>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          pageSize: 7,
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
}
