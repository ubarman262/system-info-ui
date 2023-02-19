import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiderComponent from './components/Sider/sider';
import About from './views/About/About';
import Dashboard from './views/Dashboard/Dashboard';
import Network from './views/Network/network';
import Storage from './views/Storage/Storage';
import "./App.css";
import HeaderComponent from './components/Header/header';

const { Footer } = Layout;

const App = () => {

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <HeaderComponent />
      <SiderComponent />
      <Layout className="site-layout"
      >
        <div className="component-container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/network" element={<Network />} />
            <Route path="/about" element={<About />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
         System-Info ©2023 Created by Ujjwal Barman
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;