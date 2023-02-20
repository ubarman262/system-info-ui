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
      document.getElementsByClassName("sider")[0].style["z-index"] = "999";
    } else {
      document.getElementsByClassName("sider")[0].style.opacity = "0";
      document.getElementsByClassName("sider")[0].style["z-index"] = "-1";
    }
  };

  return (
    <Header className="headerBar">
      <MenuOutlined style={{ color: "white", marginLeft: "-30px", fontSize: "20px" }} onClick={handleMenuClick} />
      <div>
        <button className="headerLogo">SYSTEM</button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
