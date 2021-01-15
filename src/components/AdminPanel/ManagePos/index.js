import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {
  Button, Divider, Form, Input, Spin, Table, Popconfirm,
} from 'antd';
import { Icon } from '@ant-design/compatible';
import { connect } from 'react-redux';
import classes from './index.module.css';
import ManagePosCards from '../ManagePosCards';
import * as actions from '../../../store/actions';
import { posStatusEnum } from '../../../utils';
import {EditOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import './style.css'

const ManagePos = (props) => {
  const [form] = Form.useForm();
   const { poses, getPoses } = props;
  // Local State Definition
  const [isNewPosAdding, setIsNewPosAdding] = useState(false)
  const [onlyActiveStatus, setOnlyActiveStatus] = useState(false)
  const [editingKey, setEditingKey] = useState("")
  const [editingEmailKey, setEditingEmailKey] = useState("")
  const [editingAddressKey, setEditingAddressKey] = useState("")
  const [poseData, setPoseData] = useState()

  useEffect(()=>{
    getPoses({ onlyActiveStatus });
  }, [onlyActiveStatus, getPoses]);

  useEffect(() => {
    setPoseData(poses)
  }, [poses]);


  const isEditing = (record) => record.key === editingKey;

  const editEmail = (record) => {
    form.setFieldsValue({
      email: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
    setEditingEmailKey("email")
  };
  const editAddress = (record) => {
    form.setFieldsValue({
      email: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
    setEditingAddressKey("address")
  };
  const cancel = () => {
    setEditingKey('');
    setEditingAddressKey("")
    setEditingEmailKey("")
  };
  const cancelEmail = () => {
    setEditingEmailKey("")
    // setEditingKey('');
  }
  const cancelAddress = () => {
    setEditingAddressKey("")
    // setEditingKey('');
  }
  const saveEmail = async (key) => {
    try {
      const row = await form.validateFields();
      console.log("row", row)
      const newData = [...poseData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        console.log("item", item)
        newData.splice(index, 1, { ...item, ...row });
        setPoseData(newData);
        // setEditingKey('');
        setEditingEmailKey('')
      } else {
        newData.push(row);
        setPoseData(newData);
        // setEditingKey('');
        setEditingEmailKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  const saveAddress = async (key) => {
    try {
      const row = await form.validateFields();
      console.log("row", row)
      const newData = [...poseData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        console.log("item", item)
        newData.splice(index, 1, { ...item, ...row });
        setPoseData(newData);
        // setEditingKey('');
        setEditingAddressKey('');
      } else {
        newData.push(row);
        setPoseData(newData);
        // setEditingKey('');
        setEditingAddressKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  // const save = async (key) => {
  //   try {
  //     const row = await form.validateFields();
  //     console.log("row", row)
  //     const newData = [...poseData];
  //     const index = newData.findIndex((item) => key === item.key);

  //     if (index > -1) {
  //       const item = newData[index];
  //       console.log("item", item)
  //       newData.splice(index, 1, { ...item, ...row });
  //       setPoseData(newData);
  //       setEditingKey('');
  //     } else {
  //       newData.push(row);
  //       setPoseData(newData);
  //       setEditingKey('');
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };
  const columns = [
    {
      title: 'POS ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, { key }) => {
        if (isNewPosAdding === true && key === 'new_pos') {
          return (
            <div style={{ marginBottom: 20 }}>{text}</div>
          );
        }
        return text;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
      render: (text, record) => {
        const editable = isEditing(record);
        if (isNewPosAdding === true && record.key === 'new_pos') {
          return (
            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Pos Email" />
            </Form.Item>
          );
        } else if (editable && editingEmailKey === "email") {
          return (
            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            )
        }

        return text;
      },
    },
    {
      title: '',
      dataIndex: 'editableEmail',
      key: 'editableEmail',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable && editingEmailKey === "email" ? (
            <div>
              <CheckOutlined style={{color: 'green'}} onClick={()=>saveEmail(record.key)}/>
              <Popconfirm title="Sure to cancel?" onConfirm={cancelEmail}>
                <CloseOutlined style={{color: 'red'}}/>
              </Popconfirm>
            </div>
          ) : (
          <EditOutlined style={{color: '#4076d9'}} onClick={()=>editEmail(record)} />
          );
      },
    },
    {
      title: (
        <div className="d-flex align-items-center ">
          <span>Status</span>
          <Button
            type="link"
            className="d-flex align-items-center m-0 p-0 ml-2"
            onClick={() => getFilteredPoses()}
          >
            <Icon type="filter" theme="filled" />
          </Button>
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      editable: true,
      render: (text, record) => {
        const editable = isEditing(record);
        if (editable && editingAddressKey === "address") {
          return (
          <Form.Item name="address" rules={[{ required: true, message: 'Please input address.' }]}>
              <Input />
          </Form.Item>
          )
        }
        return text
      },
    },
    {
      title: '',
      dataIndex: 'editableAddress',
      key: 'editableAddress',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable && editingAddressKey === "address" ? (
            <span>
              <CheckOutlined style={{color: 'green'}} onClick={()=>saveAddress(record.key)}/>
              <Popconfirm title="Sure to cancel?" onConfirm={cancelAddress}>
                <CloseOutlined style={{color: 'red'}}/>
              </Popconfirm>
            </span>
          ) : (
          <EditOutlined style={{color: '#4076d9'}} onClick={()=>editAddress(record)} />
          );
      },
    },
    {
      title: (<div className={classes.buttonsWrapper}><span className="m-auto">Action</span></div>),
      key: 'action',
      render: (text, { status, key, email }) => {

        switch (status) {
          case posStatusEnum.PENDING: {
            return (
              <div className={classes.buttonsWrapper}>
                <Button
                  type="link"
                  onClick={changePosStatus(key, posStatusEnum.INVITE_CANCELLED)}
                >
                  Cancel
                  Invite
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={resendInvite(key)}>Resend Invite</Button>
              </div>
            );
          }
          case posStatusEnum.INVITE_CANCELLED: {
            return (
              <div className={classes.buttonsWrapper}>
                <Button type="link" onClick={changePosStatus(key, posStatusEnum.PENDING)}>
                  Re
                  Invite
                </Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={changePosStatus(key, posStatusEnum.DELETED)}
                >
                  Delete
                </Button>
              </div>
            );
          }
          case posStatusEnum.ACTIVE: {
            return (
              <div className={classes.buttonsWrapper}>
                <Button
                  type="link"
                  onClick={changePosStatus(key, posStatusEnum.REVOKED)}
                >
                  Revoke
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={resetPassword(email)}>Reset Password</Button>
              </div>
            );
          }
          case posStatusEnum.REVOKED: {
            return (
              <div className={classes.buttonsWrapper}>
                <Button
                  type="link"
                  onClick={changePosStatus(key, posStatusEnum.DELETED)}
                >
                  Delete
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={changePosStatus(key, posStatusEnum.ACTIVE)}>
                  Grand
                  Access
                </Button>
              </div>
            );
          }
          default: {
            if (isNewPosAdding === true && key === 'new_pos') {
              return (
                <div style={{ marginBottom: 20 }}>
                  <Button
                    className="mr-4"
                    onClick={() => setIsNewPosAdding(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">Add</Button>
                </div>
              );
            }

            return '-';
          }
        }
      },
    },
  ]

  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   console.log("flag col",col, col.editable)
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });
  const getFilteredPoses = () => {
    const { getPoses } = props;
    getPoses({ onlyActiveStatus: !onlyActiveStatus });
    setOnlyActiveStatus(!onlyActiveStatus)
  }

  const getAddingPos = () => {
    const { poses } = props;

    return {
      key: 'new_pos',
      id: `POS${_.padStart(_.size(poses) + 1, 3, '0')}`,
      email: '',
    };
  }

  const invitePos = (form) => ({ email }) => {
    const { invitePos } = props;

    invitePos({ emails: [email] });
    setIsNewPosAdding(false)
  }

  const changePosStatus = (id, status) => () => {
    const { changePosStatus } = props;

    changePosStatus({ id, status });
  }

  const resetPassword = (email) => () => {
    const { resetPassword } = props;

    resetPassword({ email });
  };

  const resendInvite = (id) => () => {
    const { resendInvite } = props;

    resendInvite({ id });
  };

  const renderNewLineSection = () => {
    const { subscription, poses } = props;

    if (isNewPosAdding === false && _.size(poses) < _.get(subscription, 'quantityOfPos')) {
      return (
        <Button
          type="dashed"
          style={{ width: '100%', marginTop: '50px' }}
          onClick={() => setIsNewPosAdding(true)}
        >
          + Add
        </Button>
      );
    }

    return null;
  }

  const getCountOfActivePoses = () => {
    return _.size(props.activePoses);
  }

  const renderColumn = (props) => (<Table.Column {...props} />);

    const { isFetching, subscription } = props;
    const dataSource = isNewPosAdding === false ? poseData : [...poseData, getAddingPos()];
    console.log("poseData", poseData, "dataSource", dataSource)
    return (
      <div className={classes.bg_div}>
        <ManagePosCards
          isFetching={isFetching}
          quantityOfPos={subscription.quantityOfPos}
          activePoses={getCountOfActivePoses()}
        />
        
        <Spin spinning={isFetching}>
          <div className={classes.background_div}>
            <Form form={form} onFinish={invitePos(form)}>
              <Table 
              dataSource={dataSource} 
              pagination={{
                onChange: cancel,
              }}>
                {_.map(columns, renderColumn)}
              </Table>
            </Form>
            {renderNewLineSection()}
          </div>
        </Spin>
      </div>
    );
  
}

const mapStateToProps = (store) => ({
  isFetching: store.posesStore.isFetching,
  poses: store.posesStore.poses,
  activePoses: store.posesStore.activePoses,
  subscription: store.businessStore.subscription,
});

const mapDispatchToProps = (dispatch) => ({
  getPoses: (state) => dispatch(actions.getPoses(state)),
  invitePos: (state) => dispatch(actions.invitePos(state)),
  changePosStatus: (state) => dispatch(actions.changePosStatus(state)),
  resetPassword: (data) => dispatch(actions.resetPosPassword(data)),
  resendInvite: (data) => dispatch(actions.resendInvite(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ManagePos);

