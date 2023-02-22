/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Card, Skeleton, Statistic } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ThunderboltTwoTone, ApiTwoTone } from "@ant-design/icons";
import { getBatteryDetails } from "../../services/api/api-service";

const Battery = () => {
  const [batteryDetails, setBatteryDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (batteryDetails.length === 0) {
      Promise.all([setBatteryDetailsFromService()]);
    }
  }, []);

  useEffect(() => {
    // Creates a new timer when mount the component.
    const timer = setInterval(async () => {
      await doPolling();
    }, 60000);

    // Stops the old timer when umount the component.
    return function stopTimer() {
      clearInterval(timer);
    };
  }, []);

  const doPolling = async () => {
    await getBatteryDetails()
      .then((response) => {
        setBatteryDetails(response);
      })
      .catch((error) => {
        //handle error
      });
  };

  const setBatteryDetailsFromService = async () => {
    if (batteryDetails.length === 0) {
      setShowLoader(true);
      await getBatteryDetails()
        .then((response) => {
          setBatteryDetails(response);
          setShowLoader(false);
        })
        .catch((error) => {
          //handle error
        });
    }
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
          <Breadcrumb.Item>Battery</Breadcrumb.Item>
        </Breadcrumb>
        <div className="about-content">
          {showLoader ? (
            <Skeleton active />
          ) : (
            <>
              <Card bordered={false}>
                <Statistic
                  value={batteryDetails.acConnected ? "Charging," : "Unplugged,"}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={
                    batteryDetails.acConnected ? (
                      <ThunderboltTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <ApiTwoTone twoToneColor="#ff4d4f" />
                    )
                  }
                  suffix={` ${batteryDetails.percent}%`}
                />
              </Card>
            </>
          )}
        </div>
      </Content>
    </>
  );
};

export default Battery;
