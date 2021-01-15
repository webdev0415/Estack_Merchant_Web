const config = {
  Client_ID: '514639006316-sc7llarvq7amces8vrh39db83b3abksq.apps.googleusercontent.com',
  Client_Secret: 'vhYfmglAAHUEnOpc6XmcHnoU',
  // Client_ID: undefined,
  // Client_Secret: undefined,
  customersNum: 1,
  stripe: 'pk_live_r3p7LaHzrpg0lFuTAz4ABx0E00t7cJGfWl',
  // stripe: 'pk_test_lno5yN87KcaEC5C1Hbbf10Sm00sqSzpWqk',
};

const prodConfig = {
  Client_ID: '514639006316-sc7llarvq7amces8vrh39db83b3abksq.apps.googleusercontent.com',
  Client_Secret: 'vhYfmglAAHUEnOpc6XmcHnoU',
  customersNum: 100,
  stripe: 'pk_live_r3p7LaHzrpg0lFuTAz4ABx0E00t7cJGfWl',
  // stripe: 'pk_test_lno5yN87KcaEC5C1Hbbf10Sm00sqSzpWqk',
};

if (process.env.NODE_ENV === 'production') {
  for (const x in prodConfig) {
    config[x] = prodConfig[x];
  }
}

export default config;
