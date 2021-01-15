import React, { useState } from 'react';
import { Table, Form } from 'antd';
import classes from '../ManagePointTransfer/index.module.css';
import { TextButton, LinkButton } from './subscription.style';

const GlobalTable = ({
  originData,
  EditableCell,
  isEditing,
  edit,
  cancel,
  save,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const dataSource = originData && originData.sort((a, b) => {
    if (a.type > b.type) {
      return 1;
    }
    if (a.type < b.type) {
      return -1;
    }

    return 0;
  });

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      width: '25%',
      editable: false,
    },
    {
      title: 'Period',
      dataIndex: 'period',
      width: '25%',
      editable: false,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      editable: true,
    },
    {
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record, editingKey);

        return editable ? (
          <span>
            <LinkButton
              type="link"
              onClick={() => save(record.id, form, originData, setEditingKey)}
            >
              Save
            </LinkButton>
            <TextButton type="text" onClick={() => cancel(setEditingKey)}>
              Cancel
            </TextButton>
          </span>
        ) : (
          <TextButton
            type="text"
            disabled={editingKey !== ''}
            onClick={() => edit(record, form, setEditingKey)}
          >
            Edit
          </TextButton>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record, editingKey),
      }),
    };
  });
  return (
    <div className={classes.background_div}>
      <h1 className={classes.point_transfer_header}>Global subscription plans management</h1>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>

  );
};

export default GlobalTable;
