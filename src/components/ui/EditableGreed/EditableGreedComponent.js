import {
  Form, Input, InputNumber, Switch,
} from 'antd';
import React, { Component } from 'react';
import { childOrDefault } from '../../../utils';

export default class EditableGreedComponent extends Component {
  renderInput() {
    const {
      valueOny,
      immutable,
      defaultRules,
      rules,
      children,
      dataIndex,
      ...restProps
    } = this.props;

    if (valueOny === true) {
      return (
        <td {...restProps}>
          {childOrDefault(children)}
        </td>
      );
    }

    if (immutable === true) {
      return (
        <td {...restProps}>
          <div style={{ marginBottom: 20 }}>
            {childOrDefault(children)}
          </div>
        </td>
      );
    }

    return (
      <td {...restProps}>
        <Form.Item
          name={dataIndex}
          rules={rules || defaultRules}
        >
          <Input />
        </Form.Item>
      </td>
    );
  }

  renderNumberInput() {
    const {
      valueOny,
      immutable,
      defaultRules,
      rules,
      children,
      dataIndex,
      ...restProps
    } = this.props;

    if (valueOny === true) {
      return (
        <td {...restProps}>
          {childOrDefault(children)}
        </td>
      );
    }

    if (immutable === true) {
      return (
        <td {...restProps}>
          <div style={{ marginBottom: 20 }}>
            {childOrDefault(children)}
          </div>
        </td>
      );
    }

    return (
      <td {...restProps}>
        <Form.Item
          name={dataIndex}
          rules={rules || defaultRules}
        >
          <InputNumber />
        </Form.Item>
      </td>
    );
  }

  renderSwitch() {
    const {
      valueOny,
      immutable,
      defaultRules,
      rules,
      children,
      dataIndex,
      onChange,
      ...restProps
    } = this.props;

    if (valueOny) {
      return (
        <td {...restProps}>
          <Switch
            disabled={immutable}
            onChange={onChange}
            defaultChecked={children[1]}
          />
        </td>
      );
    }

    return (
      <td {...restProps}>
        <Form.Item
          name={dataIndex}
        >
          <Switch
            disabled={immutable}
            defaultChecked={children[1]}
            onChange={onChange}
          />
        </Form.Item>
      </td>
    );
  }

  renderDefault() {
    const {
      valueOny,
      immutable,
      defaultRules,
      rules,
      children,
      dataIndex,
      ...restProps
    } = this.props;

    if (valueOny === true) {
      return (
        <td {...restProps}>
          {childOrDefault(children)}
        </td>
      );
    }

    return (
      <td {...restProps}>
        <div className="d-flex" style={{ marginBottom: 20 }}>
          {childOrDefault(children)}
        </div>
      </td>
    );
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case 'input': return this.renderInput();
      case 'number': return this.renderNumberInput();
      case 'switch': return this.renderSwitch();
      default: return this.renderDefault();
    }
  }
}
