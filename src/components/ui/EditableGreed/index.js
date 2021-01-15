import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Form, Table } from 'antd';
import EditableCell from './EditableGreedCell';
import './overrides.css';

const EditableGreedCell = ({ columns, dataSource, onSave }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const onEdit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const onCancel = () => {
    form.resetFields();
    setEditingKey('');
  };

  const onSaveFunc = (record) => async (e) => {
    e.stopPropagation();
    const row = await form.validateFields();

    if (row) {
      onSave(row, record);
      setEditingKey('');
    }
  };

  const getActionsColumn = () => ({
    title: 'Operation',
    dataIndex: 'operation',
    render: (text, record) => (isEditing(record) ? (
      <>
        <Button className="mr-2" type="primary" onClick={onSaveFunc(record)}>
          Save
        </Button>
        <Button onClick={() => onCancel(record.key)}>Cancel</Button>
      </>
    ) : (
      <Button type="link" onClick={() => onEdit(record)}>
        Edit
      </Button>
    )),
  });

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const column = [...columns, getActionsColumn()].map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      type: col.type,
      rules: col.rules,
      dataIndex: col.dataIndex,
      title: col.title,
      valueOny: !isEditing(record),
      immutable: _.isFunction(col.immutable) ? col.immutable(record) : col.immutable,
      onChange: _.isFunction(col.onChange) ? col.onChange(record) : col.onChange,
    }),
  }));

  return (
    <Form form={form} component={false}>
      <Table
        components={components}
        dataSource={dataSource}
        columns={column}
        pagination={false}
      />
    </Form>
  );
};

export default EditableGreedCell;
