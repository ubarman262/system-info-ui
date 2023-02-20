/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import About from "../About/About";
import Battery from "../Battery/Battery";
import Storage from "../Storage/Storage";

const Dashboard = (props) => {
  return (
    <>
      <div>
        <Battery />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Storage />
      </div>
    </>
  );
};

export default Dashboard;
