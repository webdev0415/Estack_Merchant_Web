import { Button, Card, Spin } from 'antd';
import React from 'react';
import classes from './index.module.css';

const LoyaltyProgram = ({ data: {_id: id, isActive}, isFetching, onSubmit }) => {
  const onClick = () => onSubmit({ id, data: { isActive: !isActive } })

  const renderContent = () => (isActive === false ? (
    <>
      <span className={classes.header}>
        Your Loyalty program is currently not Active. Review the Configuration and Activate.
      </span>
      <div className="d-flex align-items-center mr-2 ml-2">
        <div className="d-flex align-items-center mr-4 ml-4">
          <span className="font-weight-bold mr-2">Status: </span>
          <span className={classes.red}>Inactive</span>
        </div>
        <Button onClick={onClick} type="primary">Activate</Button>
      </div>
    </>
  ) : (
    <>
      <span className={classes.header}>
        Your Loyalty program is currently Active
      </span>
      <div className="d-flex align-items-center mr-2 ml-2">
        <div className="d-flex align-items-center mr-4 ml-4">
          <span className="font-weight-bold mr-2">Status: </span>
          <span className={classes.green}>Active</span>
        </div>
        <Button
          onClick={onClick}
          type="danger"
        >
          Deactivate
        </Button>
      </div>
    </>
  ));

  return (
    <Card className={classes.card_main}>
      <Spin spinning={isFetching}>
        <div className={classes.card_main_div}>
          {renderContent()}
        </div>
      </Spin>
    </Card>

  );
};

export default LoyaltyProgram;
