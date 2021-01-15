import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Button, Input, InputNumber, Select, Switch,
} from 'antd';
import OtpInput from 'react-otp-input';
import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';

const { Item } = Form;
const { Option } = Select;

export default class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optValue: ''
    }
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    type: PropTypes.string.isRequired,
    itemProps: PropTypes.objectOf(PropTypes.any),
    fieldOptions: PropTypes.objectOf(PropTypes.any),
    componentProps: PropTypes.objectOf(PropTypes.any),
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
    })),
    rules: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    disabled: PropTypes.bool,
    valueOny: PropTypes.bool,
    hidden: PropTypes.bool,
    render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    name: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    setCheck: PropTypes.func,
  };

  renderSelect() {
    const {
      form, id, itemProps = {}, fieldOptions = {}, componentProps = {},
      options, rules, disabled, valueOny, initialValue: propsInitialValue,
    } = this.props;

    const initialValue = _.chain(options).find({ value: propsInitialValue }).get('label').value();

    return (
      <Item {...itemProps}>
        {form.getFieldDecorator(id, { rules, initialValue, ...fieldOptions })(
          valueOny ? (
            <span className="font-weight-bold">
              {initialValue}
            </span>
          ) : (
            <Select size="large" disabled={disabled} {...componentProps} style={{ width: '100%' }}>
              {_.map(options, ({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
              ))}
            </Select>
          ),
        )}
      </Item>
    );
  }

  renderInput() {
    const {
      form, id, itemProps = {}, fieldOptions = {}, componentProps = {},
      rules, disabled, valueOny, initialValue,
    } = this.props;

    return (
      <Item {...itemProps}>
        {form.getFieldDecorator(
          id, { rules, initialValue, ...fieldOptions },
        )(valueOny ? (
          <span className="font-weight-bold">{form.getFieldValue(id) || '-'}</span>
        ) : (
          <Input size="large" disabled={disabled} {...componentProps} />
        ))}
      </Item>
    );
  }
  renderOpt() {
    const {
      form, id, itemProps = {}, fieldOptions = {},
      rules, valueOny, initialValue,
    } = this.props;

    return (
      <Item {...itemProps}>
        {form.getFieldDecorator(
          id, { rules, initialValue, ...fieldOptions },
        )(valueOny ? (
          <span className="font-weight-bold">{form.getFieldValue(id) || '-'}</span>
        ) : (
          <OtpInput
            value={this.state.optValue}
            onChange={optValue => this.setState({ optValue })}
            numInputs={4}
            separator={<span>-</span>}
            containerStyle="containerStyle"
            inputStyle="inputStyle"
          />

        ))}
      </Item>
    );
  }

  renderInputNumber() {
    const {
      form, id, itemProps = {}, fieldOptions = {}, componentProps = {},
      rules, disabled, initialValue, valueOny,
    } = this.props;

    return (
      <Item {...itemProps}>
        {form.getFieldDecorator(
          id, { rules, initialValue, ...fieldOptions },
        )(valueOny ? (
          <span className="font-weight-bold">{form.getFieldValue(id) || '-'}</span>
        ) : (
          <InputNumber disabled={disabled} {...componentProps} />
        ))}
      </Item>
    );
  }

  renderCustom() {
    const {
      render,
    } = this.props;

    return _.isFunction(render) ? render() : render;
  }

  renderButton() {
    const {
      itemProps, componentProps, name,
    } = this.props;

    return (
      <Item {...itemProps}>
        <Button
          type="primary"
          htmlType="submit"
          {...componentProps}
        >
          {name}
        </Button>
      </Item>
    );
  }

  renderSwitch() {
    const {
      form, id, itemProps = {}, fieldOptions = {}, componentProps = {},
      rules, disabled, initialValue, setCheck,
    } = this.props;
    return (
      <Item {...itemProps}>
        {form.getFieldDecorator(
          id, {
            valuePropName: 'checked', rules, initialValue, ...fieldOptions,
          },
        )(<Switch
          className="w-100"
          size="large"
          disabled={disabled}
          onChange={() => {
            if (setCheck) {
              setCheck();
            }
          }}
          {...componentProps}
        />)}
      </Item>
    );
  }

  render() {
    const { type, hidden } = this.props;

    if (hidden) {
      return null;
    }

    switch (type) {
      case 'input':
        return this.renderInput();
      case 'opt':
        return this.renderOpt();
      case 'number':
        return this.renderInputNumber();
      case 'select':
        return this.renderSelect();
      case 'button':
        return this.renderButton();
      case 'switch':
        return this.renderSwitch();
      default:
        return this.renderCustom();
    }
  }
}
