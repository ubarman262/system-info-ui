/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import About from "../About/About";
import Storage from "../Storage/Storage";

const Dashboard = (props) => {
  return (
    <>
      <div>
        <Storage />
      </div>
      <div>
        <About />
      </div>
    </>
  );
};

export default Dashboard;
