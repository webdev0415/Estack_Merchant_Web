import React, { useState } from 'react';
import {
  Table, Form, Popconfirm, Tag, Select,
} from 'antd';
import * as _ from 'lodash';
import {
  TextButton, LinkButton, FlexWrapper,
} from './subscription.style';
import classes from '../ManagePointTransfer/index.module.css';
import ModalComponent from './modal';

const IndividualTable = ({
  originData,
  edit,
  deleteSubscriptionPlan,
  createSubscriptionPlan,
  EditableCell,
  isEditing,
  cancel,
  save,
  subscription: { emailData, emailList },
  updateSubscription,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [email, setEmail] = useState({});
  const [deselectedEmails, deselect] = useState({});

  const selectEmail = (value, data) => {
    const selected = _.cloneDeep(email);
    const deselected = _.cloneDeep(deselectedEmails);

    selected[value] = data.subscriptionid;
    delete deselected[value];

    setEmail(selected);
    deselect(deselected);
  };

  const deselectEmail = (value, data) => {
    const selected = _.cloneDeep(email);
    const deselected = _.cloneDeep(deselectedEmails);

    deselected[value] = data.subscriptionid;
    delete selected[value];

    setEmail(selected);
    deselect(deselected);
  };

  const updateSubscriptionFunc = (id) => {
    const data = { created: [], deleted: [] };

    if (emailData[id]) {
      data.created = Object.keys(email).reduce((acc, cur) => {
        if (!emailData[id].find((i) => i.email === cur)) {
          acc.push({ subscriptionId: email[cur], email: cur });
        }

        return acc;
      }, []);

      data.deleted = Object.keys(deselectedEmails).reduce((acc, cur) => {
        if (emailData[id].find((i) => i.email === cur)) {
          acc.push({ subscriptionId: deselectedEmails[cur], email: cur });
        }

        return acc;
      }, []);
    } else {
      data.created = Object.keys(email).map((i) => ({ subscriptionId: email[i], email: i }));
    }

    updateSubscription({ id, data });
  };

  const onSubmitFunction = (recordId) => {
    save(recordId, form, originData, setEditingKey);
    updateSubscriptionFunc(recordId);
    setEmail({});
    deselect({});
  };

  const onCancelFunction = () => {
    cancel(setEditingKey);
    setEmail({});
    deselect({});
  };

  const handleDelete = (id) => {
    try {
      const index = originData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = originData[index];

        deleteSubscriptionPlan({ id: item.id });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const optionData = (id) => {
    let defaultOptions = [];

    if (emailData) {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const key in emailData) {
        if (id === key) {
          defaultOptions = Object.values(emailData[key]).map((item) => item.email);
        }
      }
    }

    return defaultOptions;
  };

  const columns = [
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
      title: 'Merchants',
      dataIndex: 'merchant',
      width: '25%',
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record, editingKey);

        const defaultOptions = optionData(record.id);

        return editable
          ? (
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              options={emailList}
              defaultValue={defaultOptions}
              onSelect={selectEmail}
              onDeselect={deselectEmail}
            />
          )
          : (
            <>
              {defaultOptions.map((tag) => (
                <Tag key={`${tag}_options`}>
                  {tag}
                </Tag>
              ))}
            </>
          );
      },
    },
    {
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record, editingKey);
        return editable ? (
          <span>
            <LinkButton
              type="link"
              onClick={() => onSubmitFunction(record.id)}
            >
              Save
            </LinkButton>
            <TextButton type="text" onClick={onCancelFunction}>
              Cancel
            </TextButton>
          </span>
        ) : (
          <span>
            <TextButton
              type="text"
              disabled={editingKey !== ''}
              onClick={() => edit(record, form, setEditingKey)}
            >
              Edit
            </TextButton>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <TextButton
                type="text"
                danger
                disabled={editingKey !== ''}
              >
                Delete
              </TextButton>
            </Popconfirm>
          </span>
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
      <FlexWrapper>
        <h1 className={classes.point_transfer_header}>Individual subscription plans management</h1>
        <ModalComponent createSubscriptionPlan={createSubscriptionPlan} />
      </FlexWrapper>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default IndividualTable;
