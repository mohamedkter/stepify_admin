import { Table, Tag, Typography } from "antd";

const { Title } = Typography;

// Dummy shipping data
const shippingData = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Pending", "Shipped", "In Transit", "Delivered"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const carriers = ["FedEx", "DHL", "UPS", "USPS"];

  return {
    key: i + 1,
    shipmentId: `SHIP-${1000 + i}`,
    carrier: carriers[Math.floor(Math.random() * carriers.length)],
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    status,
  };
});

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "gold";
    case "Shipped":
      return "blue";
    case "In Transit":
      return "purple";
    case "Delivered":
      return "green";
    default:
      return "default";
  }
};

export default function Shipping() {
  const columns = [
    {
      title: "Shipment ID",
      dataIndex: "shipmentId",
      key: "shipmentId",
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
    },
    {
      title: "Shipping Date",
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
        Shipping
      </Title>

      <Table
        columns={columns}
        dataSource={shippingData}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
}
