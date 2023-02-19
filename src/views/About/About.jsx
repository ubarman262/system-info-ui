/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Collapse, Layout, Skeleton, Space } from "antd";
import { InfoCircleOutlined, WindowsFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getOSDetails, getSystemDetails } from "../../services/api/api-service";
import "./style.css";

const { Panel } = Collapse;
const { Content } = Layout;

const About = (props) => {
  const [sytemDetails, setSystemDetails] = useState([]);
  const [osDetails, setOSDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    Promise.all([setSystemDetailsFromService(), setOSDetailsFromService()]);
  }, []);

  const setSystemDetailsFromService = async () => {
    if (sytemDetails.length === 0) {
      setShowLoader(true);
      await getSystemDetails()
        .then((response) => {
          setSystemDetails(response);
          setShowLoader(false);
        })
        .catch((error) => {
          //handle error
        });
    }
  };

  const setOSDetailsFromService = async () => {
    if (osDetails.length === 0) {
      setShowLoader(true);
      await getOSDetails()
        .then((response) => {
          setOSDetails(response);
          setShowLoader(false);
        })
        .catch((error) => {
          //handle error
        });
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
        <div className="about-content">
          {showLoader ? (
            <Skeleton active />
          ) : (
            <>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Collapse defaultActiveKey={["1"]} onChange={onChange} expandIconPosition="end">
                  <Panel
                    header={
                      <div style={{ display: "flex" }}>
                        <InfoCircleOutlined style={{ fontSize: "20px" }} />
                        <div
                          style={{
                            marginLeft: "15px",
                            marginTop: "-2px",
                            fontSize: "15px",
                          }}
                        >
                          Device specifications
                        </div>
                      </div>
                    }
                    key="1"
                  >
                    <table className="table">
                      <tbody>
                        <tr>
                          <th className="tableHeader">Manufacturer</th>
                          <td>{sytemDetails.manufacturer}</td>
                        </tr>
                        <tr>
                          <th>Model</th>
                          <td>{sytemDetails.model}</td>
                        </tr>
                        <tr>
                          <th>Serial</th>
                          <td>{sytemDetails.serial}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Panel>
                </Collapse>

                <Collapse defaultActiveKey={["1"]} onChange={onChange} expandIconPosition="end">
                  <Panel
                    header={
                      <div style={{ display: "flex" }}>
                        <WindowsFilled style={{ fontSize: "20px" }} />
                        <div
                          style={{
                            marginLeft: "15px",
                            marginTop: "-2px",
                            fontSize: "15px",
                          }}
                        >
                          Windows specifications
                        </div>
                      </div>
                    }
                    key="1"
                  >
                    <table className="table">
                      <tbody>
                        <tr>
                          <th className="tableHeader">Edition</th>
                          <td>{osDetails.distro}</td>
                        </tr>
                        <tr>
                          <th className="tableHeader">Version</th>
                          <td>{osDetails.build}</td>
                        </tr>
                        <tr>
                          <th className="tableHeader">Release</th>
                          <td>{osDetails.release}</td>
                        </tr>
                        <tr>
                          <th className="tableHeader">UEFI</th>
                          <td>{osDetails.uefi ? "On" : "Off"}</td>
                        </tr>
                        <tr>
                          <th style={{ paddingRight: "20px" }}>Hypervisor</th>
                          <td>{osDetails.hypervisor ? "On" : "Off"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Panel>
                </Collapse>
              </Space>
            </>
          )}
        </div>
      </Content>
    </>
  );
};

export default About;
