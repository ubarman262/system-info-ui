/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Menu } from "antd";
import { PieChartOutlined, InfoCircleOutlined, WifiOutlined, UsbOutlined } from "@ant-design/icons";
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
  // getItem("Files", "2", <FileOutlined />),
  getItem("Network", "3", <WifiOutlined />),
  getItem("Storage", "4", <UsbOutlined />),
  getItem("About", "5", <InfoCircleOutlined />),
];

const isMobile = window.innerWidth < 480 ? true : false;

const SiderComponent = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(["1"]);

  const handleMenuChange = (value) => {
    items.forEach((item) => {
      if (value.key === item.key) {
        setSelected(`${item.key}`);
        navigate(item.label.toLowerCase());
        if (isMobile) {
          document.getElementsByClassName("sider")[0].style.opacity = "0";
          document.getElementsByClassName("sider")[0].style["z-index"] = "-1";
        }
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
      <button
        className="logo"
        style={collapsed ? { padding: "15px 20px", marginLeft: "15px", transition: "all 5ms" } : {}}
      >
        {collapsed ? "S" : "SYSTEM"}
      </button>
      <Menu theme="dark" defaultSelectedKeys={selected} mode="inline" items={items} onSelect={handleMenuChange} />
    </Sider>
  );
};

export default SiderComponent;
