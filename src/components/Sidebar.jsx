import { Menu, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  CarOutlined,
  CreditCardOutlined,
  SettingOutlined,
  MessageOutlined,
  PoweroffOutlined,
  FolderOutlined, // أيقونة جديدة للأقسام
} from "@ant-design/icons";

export default function Sidebar() {
  const location = useLocation();

  // Map pathname to selected key
  const selectedKey = (() => {
    switch (location.pathname) {
      case "/":
        return "1";
      case "/orders":
        return "2";
      case "/products":
        return "3";
      case "/shipping":
        return "4";
      case "/payments":
        return "5";
      case "/settings":
        return "6";
      case "/categories":
        return "7";
      default:
        return "1";
    }
  })();

  return (
    <div
      style={{
        background: "#0b1537",
        color: "#fff",
        height: "100vh", // full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top section */}
      <div>
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            padding: "16px 0",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <PoweroffOutlined style={{ fontSize: 28, color: "#fff" }} />
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            background: "transparent",
            border: "none",
            paddingTop: 10,
          }}
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/orders">Orders</Link>,
            },
            {
              key: "3",
              icon: <ShoppingOutlined />,
              label: <Link to="/products">Products</Link>,
            },
            {
              key: "4",
              icon: <CarOutlined />,
              label: <Link to="/shipping">Shipping</Link>,
            },
            {
              key: "5",
              icon: <CreditCardOutlined />,
              label: <Link to="/payments">Payments</Link>,
            },
            {
              key: "6",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
            {
              key: "7",
              icon: <FolderOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
          ]}
        />
      </div>

      {/* Bottom section */}
      <div style={{ padding: "0 16px 16px 16px" }}>
        <h4 style={{ color: "#fff", marginBottom: 8 }}>Customer Support</h4>
        <Button
          type="primary"
          icon={<MessageOutlined />}
          style={{
            background: "#00E5FF",
            border: "none",
            width: "100%",
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          Connect Now
        </Button>
        <div style={{ fontSize: 12, color: "#888" }}>
          <p style={{ margin: 0, cursor: "pointer" }}>Terms & Services</p>
          <p style={{ margin: 0, cursor: "pointer" }}>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
