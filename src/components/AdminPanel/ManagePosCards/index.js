import React from 'react';
import { Card, Col, Row, Spin } from 'antd';
import classes from './index.module.css';

const ManagePosCards = ({ isFetching, quantityOfPos = 0, activePoses = 0, invoice = 0 }) => (
  <>
    <Row gutter={16} className={classes.card_row}>
      <Col span={8} className={classes.col_div}>
        <Spin spinning={false}>
          <Card className={classes.card_style}>
            <div>PLAN LICENSE</div>
            <div className={classes.amount}>{quantityOfPos}</div>
          </Card>
        </Spin>
      </Col>
      <Col span={8} className={classes.col_div}>
        <Spin spinning={isFetching}>
          <Card className={classes.card_style}>
            <div>ACTIVE POS</div>
            <div className={classes.amount}>{activePoses}</div>
          </Card>
        </Spin>
      </Col>
      <Col span={8} className={classes.col_div}>
        <Spin spinning={false}>
          <Card className={classes.card_style}>
            <div>INVOICE AMOUNT</div>
            <div className={classes.amount}>
              {`$ ${invoice}`}
            </div>
          </Card>
        </Spin>
      </Col>
    </Row>
  </>
);

export default ManagePosCards;
