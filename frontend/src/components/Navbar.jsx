import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="messages">
        <Link to="/messages">Messages</Link>
      </Menu.Item>

      <Menu.Item key="orders">
        <Link to="/orders">Notification</Link>
      </Menu.Item>

      <Menu.Item key="profile">
        <Link to="/profile">Settings</Link>
      </Menu.Item>

      <Menu.Item key="logout" onClick={handleLogout}>
        <Link to="/">Log Out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="custom-header">
      <div className="logo">
        <h1 className="custom-logo-text">WWHub</h1>
      </div> 
      <Menu theme="dark" mode="horizontal" className="custom-menu">
        <Menu.Item key="1" className="custom-menu-item">
          <Link to="/home">Home</Link>
        </Menu.Item>

        <Menu.Item key="2" className="custom-menu-item">
          <Link to="/products">Products</Link>
        </Menu.Item>

        <Menu.Item key="3" className="custom-menu-item">
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <Button type="text" className="custom-dropdown-button">
              Profile <DownOutlined />
            </Button>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
  