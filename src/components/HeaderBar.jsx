import { Layout, Switch } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderBar = ({ darkMode, onToggle }) => {
  return (
    <Header style={{
      background: darkMode ? '#001529' : '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px'
    }}>
      <h2 style={{ color: darkMode ? '#fff' : '#000' }}>$ 45,385.00</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <BellOutlined style={{ fontSize: '18px', color: darkMode ? '#fff' : '#000' }} />
        <UserOutlined style={{ fontSize: '18px', color: darkMode ? '#fff' : '#000' }} />
        <Switch checked={darkMode} onChange={onToggle} checkedChildren="Dark" unCheckedChildren="Light" />
      </div>
    </Header>
  );
};

export default HeaderBar;
