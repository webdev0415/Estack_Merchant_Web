import React from 'react';
import { Card } from 'antd';
import classes from './index.module.css';

function SetMembershipTiersCards() {
  return (
    <div className={classes.card_main_div}>
      <div gutter={12} className={classes.card_row_main}>
        <div gutter={12} className={classes.card_row}>
          <div span={6} className={classes.col_div}>
            <Card className={classes.card_style}>
              <div className={classes.cardHider}>Coming soon.</div>
              <h4 style={{ height: '30px' }}>Gross Merchandise Value</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>$ 0</p>
                <p className={classes.change_dod_wow}>WoW Change</p>
                <p className={classes.change_dod_wow}>DoD Change</p>
              </div>
              <p className={classes.today}>Redeemed Today $0</p>
            </Card>
          </div>
          <div span={6} className={classes.col_div}>
            <Card className={classes.card_style}>
              <div className={classes.cardHider}>Coming soon.</div>
              <h4 style={{ height: '30px' }}>Total Visits</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>$ 0</p>
                <p className={classes.change_dod_wow}>WoW Change</p>
                <p className={classes.change_dod_wow}>DoD Change</p>
              </div>
              <p className={classes.today}>Redeemed Today $0</p>
            </Card>
          </div>
        </div>
        <div gutter={12} className={classes.card_row}>
          <div span={6} className={classes.col_div}>
            <Card className={classes.card_style}>
              <div className={classes.cardHider}>Coming soon.</div>
              <h4 style={{ height: '30px' }}>Total Members</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>$ 0</p>
                <p className={classes.change_dod_wow}>WoW Change</p>
                <p className={classes.change_dod_wow}>DoD Change</p>
              </div>
              <p className={classes.today}>Redeemed Today $0</p>
            </Card>
          </div>
          <div span={6} className={classes.col_div}>
            <Card className={classes.card_style}>
              <div className={classes.cardHider}>Coming soon.</div>
              <h4 style={{ height: '30px' }}>Gross Merchandise</h4>
              <div className={classes.height_maintain}>
                <p className={classes.amount}>$ 0</p>
                <p className={classes.change_dod_wow}>WoW Change</p>
                <p className={classes.change_dod_wow}>DoD Change</p>
              </div>
              <p className={classes.today}>Redeemed Today $0</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetMembershipTiersCards;
