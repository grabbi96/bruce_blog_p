import React from 'react';
import { Row, Col } from 'antd';

const AuthLayout = (WraperContent) => {
  return () => {
    return (
      <Row>
        <Col span={12} offset={6}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
