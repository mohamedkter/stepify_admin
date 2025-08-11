import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Shipping from "./pages/Shipping";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Categories from "./pages/Categories";

const { Sider, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#0b1537" }}>
        <Sidebar />
      </Sider>

      <Layout>
        <Content style={{ padding: 24, background: "#f0f2f5" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
