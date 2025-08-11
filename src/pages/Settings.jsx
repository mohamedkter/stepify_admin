import { useState } from "react";
import { Typography, Form, Input, Button, Switch, Select, Card, message } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function Settings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        message.success("Settings saved successfully!");
        console.log("Saved settings:", values);
      }, 1000);
    });
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Settings
      </Title>

      <Card title="Profile" style={{ marginBottom: 24 }}>
        <Form layout="vertical" form={form} initialValues={{
          name: "John Doe",
          email: "john@example.com",
          theme: "light",
          notifications: true
        }}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password placeholder="Leave blank to keep current password" />
          </Form.Item>
        </Form>
      </Card>

      <Card title="Preferences" style={{ marginBottom: 24 }}>
        <Form layout="vertical" form={form}>
          <Form.Item name="theme" label="Theme">
            <Select>
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notifications"
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Card>

      <Button type="primary" onClick={handleSave} loading={loading}>
        Save Changes
      </Button>
    </div>
  );
}
