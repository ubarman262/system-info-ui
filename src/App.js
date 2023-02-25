import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiderComponent from './components/Sider/sider';
import About from './views/About/About';
import Dashboard from './views/Dashboard/Dashboard';
import Network from './views/Network/Network';
import Storage from './views/Storage/Storage';
import "./App.css";
import HeaderComponent from './components/Header/header';
import Battery from './views/Battery/Battery';

const { Footer, Content } = Layout;

const isMobile = window.innerWidth < 480 ? true : false;

const App = () => {

  const handleMenuCLose = () => {
    if (isMobile) {
      document.getElementsByClassName("sider")[0].style.opacity = "0";
      document.getElementsByClassName("sider")[0].style["z-index"] = "-1";
    }
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <HeaderComponent />
      <SiderComponent />
      <Layout className="site-layout" onClick={handleMenuCLose}>
        <div className="component-container">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/network" element={<Network />} />
              <Route path="/about" element={<About />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/battery" element={<Battery />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Content>
        </div>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Systems ©2023 Created by Ujjwal Barman
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;