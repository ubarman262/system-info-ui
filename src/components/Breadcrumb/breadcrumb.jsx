import { Breadcrumb } from "antd";

const BreadcrumbComponent = (props) => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComponent;
