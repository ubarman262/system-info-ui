/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Skeleton, Statistic } from "antd";
import { useEffect, useState } from "react";
import { ThunderboltTwoTone, ApiTwoTone } from "@ant-design/icons";
import { getBatteryDetails } from "../../services/api/api-service";
import BreadcrumbComponent from "../../components/Breadcrumb/breadcrumb";

import "./style.css";

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
      <BreadcrumbComponent title="Battery" />
      <div className="page-content">
        {showLoader ? (
          <Skeleton active />
        ) : (
          <>
            <Card bordered={false} className="battery-card">
              <Statistic
                value={
                  batteryDetails.acConnected
                    ? batteryDetails.percent === 100
                      ? "Charged,"
                      : "Charging,"
                    : "Unplugged,"
                }
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
    </>
  );
};

export default Battery;
