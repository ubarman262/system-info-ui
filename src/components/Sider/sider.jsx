import { Layout, Menu } from "antd";
import { FileOutlined, PieChartOutlined, InfoCircleOutlined, WifiOutlined, UsbOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Files", "2", <FileOutlined />),
  getItem("Network", "3", <WifiOutlined />),
  getItem("Storage", "4", <UsbOutlined />),
  getItem("About", "5", <InfoCircleOutlined />),
];

const isMobile = window.innerWidth < 480 ? true : false;

const SiderComponent = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuChange = (value) => {
    items.forEach((item) => {
      if (value.key === item.key) {
        navigate(item.label.toLowerCase());
        document.getElementsByClassName("sider")[0].style.opacity = "0";
      }
    });
  };

  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={isMobile ? false : collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="sider"
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={handleMenuChange} />
    </Sider>
  );
};

export default SiderComponent;
