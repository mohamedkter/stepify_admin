import { Table, Tag, Typography } from "antd";

const { Title } = Typography;

// Dummy payments data
const paymentData = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Pending", "Completed", "Failed", "Refunded"];
  const methods = ["Credit Card", "PayPal", "Bank Transfer", "Cash"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    key: i + 1,
    transactionId: `TXN-${100000 + i}`,
    customer: `Customer ${i + 1}`,
    amount: parseFloat((Math.random() * 500 + 10).toFixed(2)),
    method: methods[Math.floor(Math.random() * methods.length)],
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    status,
  };
});

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "gold";
    case "Completed":
      return "green";
    case "Failed":
      return "red";
    case "Refunded":
      return "blue";
    default:
      return "default";
  }
};

export default function Payments() {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Payments
      </Title>

      <Table
        columns={columns}
        dataSource={paymentData}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
}
