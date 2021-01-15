import React, { Component } from 'react';
import { Layout } from 'antd';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from './Header';
import AdminPanelLayout from './AdminPanelLayout';
import Sider from './Drawer';
import NotificationsPanel from './NotificationsPanel';
import * as actions from '../../store/actions';

class AdminPanel extends Component {
  static propTypes = { location: PropTypes.objectOf(PropTypes.any) };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    const { getCustomersList } = this.props;
    getCustomersList();
  }

  setCollapsed = (bool) => {
    this.setState({ isOpen: bool });
  }

  render() {
    const {
      location, business, subscription, roles, customersCount,
    } = this.props;
    const { isOpen } = this.state;

    const isRoot = roles && roles.includes('root');

    return (
      <Layout>
        <Sider isOpen={isOpen} isRoot={isRoot} />
        <Layout className="position-relative min-vh-100">
          <Header
            collapsed={isOpen}
            setCollapsed={this.setCollapsed}
            location={location}
            business={business}
          />
          <NotificationsPanel
            subscription={subscription}
            customersCount={customersCount}
          />
          <AdminPanelLayout />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (store) => ({
  isFetching: store.businessStore.isFetching,
  business: store.businessStore.business,
  subscription: store.businessStore.subscription,
  roles: store.authStore.user.roles,
  customersCount: store.statsStore.customersList.length,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: () => dispatch(actions.getCustomersList()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPanel));
