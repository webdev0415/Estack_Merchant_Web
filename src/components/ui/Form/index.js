import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Antd from 'antd';
import * as OldAntd from '@ant-design/compatible';
import * as _ from 'lodash';
import FormComponent from '../FormComonent';
import './overrides.css';

class Form extends Component {
  static propTypes = {
    ...OldAntd.Form.propTypes,
    fields: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonName: PropTypes.string,
    className: PropTypes.string,
    initialValues: PropTypes.objectOf(PropTypes.any),
    form: PropTypes.objectOf(PropTypes.any),
    isFetching: PropTypes.bool,
    isButtonRemoved: PropTypes.bool,
  };

  renderItem = (item) => {
    const { form, initialValues } = this.props;

    return (
      <FormComponent
        key={item.id}
        form={form}
        initialValue={_.get(initialValues, item.id)}
        {...item}
      />
    );
  };

  renderItems() {
    const { fields, form } = this.props;

    return _.map(fields(form), this.renderItem);
  }

  renderForm() {
    const {
      isButtonRemoved,
    } = this.props;

    return (
      <>
        {this.renderItems()}
        {!isButtonRemoved && (
          <OldAntd.Form.Item className="w-100 login_btn">{this.renderButton()}</OldAntd.Form.Item>)}
      </>
    );
  }

  renderButton() {
    const {
      buttonName, isFetching,
    } = this.props;

    let name = 'Submit';

    if (buttonName) {
      name = buttonName;
    }

    if (isFetching) {
      const antIcon = <OldAntd.Icon type="loading" style={{ fontSize: 24 }} spin />;
      name = <Antd.Spin indicator={antIcon} />;
    }

    return (
      <Antd.Button
        className="w-100"
        type="primary"
        htmlType="submit"
        size="large"
        disabled={isFetching}
      >
        {name}
      </Antd.Button>
    );
  }

  render() {
    const {
      onSubmit, form, className, layout, wrapper: Wrapper,
    } = this.props;

    return (
      <OldAntd.Form onSubmit={onSubmit(form)} className={className} layout={layout}>
        {
          Wrapper ? (
            <Wrapper form={form}>
              {this.renderForm()}
            </Wrapper>
          ) : this.renderForm()
        }
      </OldAntd.Form>
    );
  }
}

export default OldAntd.Form.create()(Form);
