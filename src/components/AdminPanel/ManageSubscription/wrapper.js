import React from 'react';
import { InputNumber } from 'antd';
import GlobalTable from './global';
import IndividualTable from './individual';
import { FormItem } from './subscription.style';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => (
  <td {...restProps}>
    {editing && dataIndex === 'price' ? (
      <FormItem
        name={dataIndex}
        rules={[
          {
            required: true,
            message: 'Please input number!',
          },
        ]}
      >
        <InputNumber />
      </FormItem>
    ) : (
      children
    )}
  </td>
);

const isEditing = (record, editingKey) => record.id === editingKey;

const edit = (record, form, setEditingKey) => {
  form.setFieldsValue({
    price: '',
    ...record,
  });
  setEditingKey(record.id);
};

const cancel = (setEditingKey) => {
  setEditingKey('');
};

const WrapperComponent = ({
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  originData,
  subscription,
  updateSubscription,
}) => {
  const save = async (id, form, data, setEditingKey) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => (id === item.id && row.price !== item.price));

      if (index > -1) {
        const item = newData[index];

        updateSubscriptionPlan({ id: item.id, price: row.price });

        setEditingKey('');
      } else {
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  return (
    <div>
      <GlobalTable
        originData={originData.global}
        EditableCell={EditableCell}
        isEditing={isEditing}
        edit={edit}
        cancel={cancel}
        save={save}
      />
      <IndividualTable
        originData={originData.individual}
        EditableCell={EditableCell}
        isEditing={isEditing}
        edit={edit}
        cancel={cancel}
        save={save}
        createSubscriptionPlan={createSubscriptionPlan}
        deleteSubscriptionPlan={deleteSubscriptionPlan}
        subscription={subscription}
        updateSubscription={updateSubscription}
      />
    </div>
  );
};
export default WrapperComponent;
