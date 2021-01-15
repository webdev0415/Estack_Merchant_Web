import _ from 'lodash';
import React from 'react';
import { Button, Modal, Spin } from 'antd';
import { connect } from 'react-redux';
import Card from 'react-credit-cards';
import classes from './index.module.css';
import PaymentForm from './PaymentForm';
import * as actions from '../../../store/actions';
import 'react-credit-cards/es/styles-compiled.css';

class PaymentInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleAddPayment: false,
      isVisibleSubmitPayment: false,
      submitId: null,
    };
  }

  componentDidMount() {
    const { getCardList } = this.props;
    getCardList();
  }

  onSubmitPayment = (id) => () => {
    const { submitPayment } = this.props;
    submitPayment({ card: id });
    this.setState({ isVisibleSubmitPayment: false });
  }

  onDeletePayment = (id) => () => {
    const { deletePayment } = this.props;
    deletePayment({ card: id });
    this.setState({ isVisibleSubmitPayment: false });
  }

  renderAddButton() {
    const { cards } = this.props;

    if (_.size(cards) < 1) {
      return (
        <Button type="primary" onClick={() => this.setState({ isVisibleAddPayment: true })}>
          Add Payment Method
        </Button>
      );
    }
    return (
      <Button type="primary" onClick={this.onDeletePayment(_.get(_.first(cards), 'id'))}>
        Delete Payment Method
      </Button>
    );
  }

  renderCards() {
    const { cards } = this.props;

    return (
      <div className={classes.form}>
        {_.map(cards, ({
          id, brand, last4, exp_year: expY, exp_month: expM,
        }) => (
          <div className="mt-4 mb-4 d-flex justify-content-center cursor-pointer" key={id}>
            <div onClick={() => this.setState({ isVisibleSubmitPayment: true, submitId: id })}>
              <Card
                number={_.padStart(last4, 16, '*')}
                name={'  '}
                expiry={`${_.padStart(expM, 2, '0')}${expY}`}
                issuer={brand}
                cvc="000"
                preview
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      isFetching, addCard, cards, subscription: { price, quantityOfPos },
    } = this.props;
    const { isVisibleAddPayment, isVisibleSubmitPayment, submitId } = this.state;

    return (
      <div className={classes.wrapper}>
        <Modal
          footer={null}
          title="Add new payment"
          visible={isVisibleAddPayment}
          onCancel={() => this.setState({ isVisibleAddPayment: false })}
        >
          <PaymentForm
            addCard={addCard}
            onSuccess={() => this.setState({ isVisibleAddPayment: false })}
            onCancel={() => this.setState({ isVisibleAddPayment: false })}
          />
        </Modal>
        <Modal
          title="Submit payment"
          visible={isVisibleSubmitPayment}
          onCancel={() => this.setState({ isVisibleSubmitPayment: false })}
          okText="Yes"
          onOk={this.onSubmitPayment(submitId)}
        >
          Are You sure to submit payment for your current subscription? Amount:
          {' '}
          {price * quantityOfPos}
          $
        </Modal>
        <div className="d-flex justify-content-between">
          <h1 className={classes.header}>Payment Information</h1>
          {this.renderAddButton()}
        </div>
        <Spin spinning={isFetching}>
          <div className="d-flex flex-column justify-content-center">
            <h3 className="text-center">My Payment Method</h3>
            {!isFetching && _.size(cards) < 1 ? (
              <div className="d-flex justify-content-center m-5">
                <Button size="large" type="primary" onClick={() => this.setState({ isVisibleAddPayment: true })}>
                  Add Payment Method
                </Button>
              </div>
            ) : null}
          </div>
          {this.renderCards()}
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.paymentStore.isFetching,
  cards: state.paymentStore.cards,
  subscription: state.businessStore.subscription,
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (payload) => dispatch(actions.addCard(payload)),
  getCardList: () => dispatch(actions.getCardList()),
  submitPayment: (payload) => dispatch(actions.submitPayment(payload)),
  deletePayment: (payload) => dispatch(actions.deletePayment(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformation);
