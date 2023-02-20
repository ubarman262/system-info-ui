/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Breadcrumb, Card, Col, Layout, Progress, Row, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { formatBytes } from "../../common/utils";
import { getDiskDetails } from "../../services/api/api-service";
import "./style.css";

const { Content } = Layout;

const Storage = (props) => {
  const [disksDetails, setDisksDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    Promise.all([setDisksDetailsFromService()]);
  }, []);

  const setDisksDetailsFromService = async () => {
    if (disksDetails.length === 0) {
      setShowLoader(true);
      await getDiskDetails()
        .then((response) => {
          setDisksDetails(response);
          setShowLoader(false);
        })
        .catch((error) => {
          //handle error
        });
    }
  };

  const getDisks = () => {
    const disksElement = [];
    disksDetails.forEach((disk) => {
      disksElement.push(
        <Badge.Ribbon
          key={disk.name}
          text={disk.use > 80 ? "Critical" : ""}
          color={disk.use > 80 ? "red" : "transparent"}
          placement="start"
        >
          <Card className="card-container">
            <Row>
              <Col span={12}>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "25px",
                  }}
                >
                  <Progress
                    key={disk.name}
                    type="circle"
                    percent={disk.use}
                    format={(percent) => `${Math.round(percent)}%`}
                    // strokeLinecap="butt"
                    strokeWidth={8}
                    // strokeColor={disk.use <= 40 ? "#52c41a" : disk.use > 40 && disk.use <= 80 ? "#1677ff" : "#ff4d4f"}
                    strokeColor={{ "0%": "#d3dee3", "100%": disk.use <= 40 ? "#52c41a" : disk.use > 40 && disk.use <= 80 ? "#1677ff" : "#ff4d4f" }}
                  />
                  <strong>
                    <p>{disk.label ? disk.label : "No Label"}</p>
                  </strong>
                </div>
              </Col>
              <Col span={12}>
                <strong
                  style={{
                    textAlign: "end",
                  }}
                >
                  <p>Mount: {disk.name}\</p>
                  <p>Type: {disk.type}</p>
                  <p>Size: {formatBytes(disk.size)}</p>
                  <p>Used: {formatBytes(disk.used)}</p>
                  <p>Available: {formatBytes(disk.available)}</p>
                </strong>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      );
    });
    return disksElement;
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
          <Breadcrumb.Item>Storage</Breadcrumb.Item>
        </Breadcrumb>
        <div className="storages-container">
          {showLoader ? <Skeleton active /> : <></>}
          <Space wrap size={30}>{getDisks()}</Space>
        </div>
      </Content>
    </>
  );
};

export default Storage;
