/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Collapse, Row, Skeleton, Space } from "antd";
import { InfoCircleOutlined, WindowsFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCPUDetails, getOSDetails, getSystemDetails } from "../../services/api/api-service";
import BreadcrumbComponent from "../../components/Breadcrumb/breadcrumb";

import "./style.css";

const { Panel } = Collapse;

const intel = {
  link: "https://www.pngkey.com/png/full/49-495376_intel-transparent-background-intel-inside-core-i7-logo.png",
  size: 95,
};

const About = (props) => {
  const [systemDetails, setSystemDetails] = useState([]);
  const [osDetails, setOSDetails] = useState([]);
  const [cpuDetails, setCPUDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    Promise.all([setSystemDetailsFromService(), setOSDetailsFromService(), setCPUDetailsFromService()]);
  }, []);

  const setSystemDetailsFromService = async () => {
    if (systemDetails.length === 0) {
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

  const setCPUDetailsFromService = async () => {
    if (systemDetails.length === 0) {
      setShowLoader(true);
      await getCPUDetails()
        .then((response) => {
          setCPUDetails(response);
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
    //
  };

  return (
    <>
      <BreadcrumbComponent title="About" />
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
                  <Row>
                    <Col span={20}>
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="tableHeader">Processor</th>
                            <td>
                              {cpuDetails.manufacturer} {cpuDetails.brand} CPU @ {cpuDetails.speed}GHz
                            </td>
                          </tr>
                          <tr>
                            <th className="tableHeader">Processor cores</th>
                            <td>
                              {cpuDetails.performanceCores} Performance cores, {cpuDetails.efficiencyCores} Efficiency
                              cores
                            </td>
                          </tr>
                          <tr>
                            <th className="tableHeader">Manufacturer</th>
                            <td>{systemDetails.manufacturer}</td>
                          </tr>
                          <tr>
                            <th>Model</th>
                            <td>{systemDetails.model}</td>
                          </tr>
                          <tr>
                            <th>Serial</th>
                            <td>{systemDetails.serial}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col span={4} className="logo-col">
                      <img src={intel.link} alt="processor-logo" width={intel.size} />
                    </Col>
                  </Row>
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
    </>
  );
};

export default About;
