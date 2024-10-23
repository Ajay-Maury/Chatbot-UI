import { Spin } from "antd";
import React from "react";

const LoadingScreen = () => {
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  );
};

export default LoadingScreen;
