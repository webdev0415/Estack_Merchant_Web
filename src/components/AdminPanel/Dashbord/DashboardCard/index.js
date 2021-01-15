import React from 'react';
import { Card, Col, Row } from 'antd';
import classes from './index.module.css';


function DashBoardCard(props) {
  return (
    <div>
      <Row gutter={16} className={classes.card_row}>
        <Col span={6} className={classes.col_div}>
          <Card className={classes.card_style}>
            <div className={classes.card_body}>
              {/* <div className="card-body"> */}
              <h4 style={{ height: '30px' }}>Total Transactions</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>
$
                  {' '}
                  {props.cardsData.totalTransactions.totalAmount}
                </p>
                {/* <p className={classes.change_dod_wow}>WoW Change</p>
              <p className={classes.change_dod_wow}>DoD Change</p> */}
              </div>
              <p className={classes.today}>
Redeemed Today $
                {' '}
                {props.cardsData.totalTransactions.transactionsToday}
              </p>
            </div>
            {/* </div> */}
          </Card>
        </Col>
        <Col span={6} className={classes.col_div}>
          <Card className={classes.card_style}>
            <div className={classes.card_body}>
              <h4 style={{ height: '30px' }}>Total Visits</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>{props.cardsData.visits.totalVisits}</p>
                {/* <p className={classes.change_dod_wow}>WoW Change</p>
              <p className={classes.change_dod_wow}>DoD Change</p> */}
              </div>
              <p className={classes.today}>
Visits Today
                {' '}
                {props.cardsData.visits.todayVisits}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={6} className={classes.col_div}>
          <Card className={classes.card_style}>
            <div className={classes.card_body}>
              <h4 style={{ height: '30px' }}>Total Members</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>{props.cardsData.members.totalMembers}</p>
                {/* <p className={classes.change_dod_wow}>WoW Change</p>
              <p className={classes.change_dod_wow}>DoD Change</p> */}
              </div>
              <p className={classes.today} />
            </div>
          </Card>
        </Col>
        <Col span={6} className={classes.col_div}>
          <Card className={classes.card_style}>
            <div className={classes.card_body}>
              <h4 style={{ height: '30px' }}>Gross Merchandise Value</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>
$
                  {' '}
                  {props.cardsData.grossValue.totalAmount}
                </p>
                {/* <p className={classes.change_dod_wow}>WoW Change</p>
              <p className={classes.change_dod_wow}>DoD Change</p> */}
              </div>
              <p className={classes.today} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoardCard;
