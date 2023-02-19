import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";

const { Header } = Layout;

const HeaderComponent = () => {
  const handleMenuClick = () => {
    if (
      document.getElementsByClassName("sider")[0].style.opacity === "0" ||
      document.getElementsByClassName("sider")[0].style.opacity === ""
    ) {
      document.getElementsByClassName("sider")[0].style.opacity = "1";
    } else {
      document.getElementsByClassName("sider")[0].style.opacity = "0";
    }
  };

  return (
    <Header className="headerBar">
      <MenuOutlined style={{ color: "white", marginLeft: "-30px", fontSize: "20px" }} onClick={handleMenuClick} />
    </Header>
  );
};

export default HeaderComponent;
