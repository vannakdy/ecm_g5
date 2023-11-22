import { request } from "../../share/request";
import { useEffect, useState } from "react";
import { Button, Table, Space, Tag, Input, Modal, Form, Select, Slider,Spin, message, Popconfirm } from 'antd';
import { formatDateClient, formatDateServer } from "../../share/helper";
import styles from "./styles.module.css"
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const EmplyeePage = () => {

    const [form] = Form.useForm();
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading,setLoadin] = useState(false)
    const [visible, setVisible] = useState(false)
    const [Id,setId] = useState(null)
    const [textSearch , setTextSearch] = useState("")

    useEffect(() => {
        getList()
    }, []);

    const getList = async () => {
        setLoadin(true);
        var param = "";
        if(textSearch != ""){
            param = "?textSearch="+textSearch
        }
        const res = await request("employee"+param, "get");
        setLoadin(false);
        if (res) {
            setList(res.list)
            setTotal(res.total[0].Total)
        } else {

        }
    }

    const onNewEmplyee = () => {
        setVisible(true)
    }

    const onCloseModal = () => {
        setVisible(false)
        onClearForm();
        setId(null)
    }

    const onDelete = async(Id) => {
        var param = {
            Id : Id
        }
        const res = await request("employee","delete",param);
        if(!res.error){
            getList()
        }else{
            alert(res.meassage)
        }
    }

    const onFinish =  async (values) => { // get value from form
        // can get data from form then past to api
        var param = {
            "Firstname": values.Firstname,
            "Lastname": values.Lastname,
            "Gender": values.Gender,
            "Dob": values.Dob,
            "Email":values.Email,
            "Tel": values.Tel,
            "Address": values.Address,
            "Role": values.Role,
        }
        var method = "post"
        if(Id != null){ // mean update
            param.Id = Id;
            method = "put"
        }
        const res = await request("employee",method,param);
        if(!res.error){
            message.success(res.message)
            getList()
            form.resetFields();
            onCloseModal();
        }else{
            message.error(res.message)
        }
        
    };

    const onClearForm = () => {
        form.resetFields();
    }

    const onClickEdit = (item) => {
        setId(item.Id)
        form.setFieldsValue({
            Firstname: item.Firstname,
            Lastname:item.Lastname,
            Gender:item.Gender+"",
            Dob:formatDateServer(item.Dob),
            Email:item.Email,
            Tel:item.Tel,
            Address:item.Address,
            Role:item.Role
        });
        setVisible(true)
    }

    const onSearch = (value) => {
        getList()
    }

    const onChangeTextSearch = (e) => {
        setTextSearch(e.target.value)
    }

    return (
        <div>
            <Spin spinning={loading}>
                <div className={styles.headerContainer}>
                    <div className={styles.containFilter}>
                        <div>
                            <div className={styles.txtHeader}>Employee</div>
                            <div>total : {total} Emp</div>
                        </div>
                        <Input.Search allowClear onSearch={onSearch} onChange={onChangeTextSearch} />
                    </div>
                    <Button onClick={onNewEmplyee}>New Employee</Button>
                </div>
                <Table
                    dataSource={list}
                    columns={[
                        {
                            key: "No",
                            title: "No",
                            dataIndex: "Id",
                            render: (value, items, index) => (index + 1)
                        },
                        {
                            key: "Firstname",
                            title: "Firstname",
                            dataIndex: 'Firstname'
                        },
                        {
                            key: "Lastname",
                            title: "Lastname",
                            dataIndex: 'Lastname'
                        },
                        {
                            key: "Gender",
                            title: "Gender",
                            dataIndex: 'Gender',
                            render: (value, items, index) => (value == 1 ? "Male" : "Female")
                        },
                        {
                            key: "Dob",
                            title: "Dob",
                            dataIndex: 'Dob',
                            render: (value) => formatDateClient(value)
                        },
                        {
                            key: "Email",
                            title: "Email",
                            dataIndex: 'Email'
                        },
                        {
                            key: "Tel",
                            title: "Tel",
                            dataIndex: 'Tel'
                        },
                        {
                            key: "Address",
                            title: "Address",
                            dataIndex: 'Address'
                        },
                        {
                            key: "Role",
                            title: "Role",
                            dataIndex: 'Role',
                            render: (value) => {
                                return (
                                    <Tag color="blue">{value}</Tag>
                                )
                            }
                        },
                        {
                            key: "Creation",
                            title: "Creation",
                            dataIndex: 'CreateAt',
                            render: (value) => formatDateClient(value)
                        },
                        {
                            key: "Actoin",
                            title: "Action",
                            dataIndex: 'CreateAt',
                            render: (value, item, index) => {
                                return (
                                    <Space key={index}>
                                        <Button type="primary" onClick={()=>onClickEdit(item)}>Edit</Button>
                                        <Popconfirm
                                            title="Delete"
                                            description="Are you sure to delete this record?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={()=>onDelete(item.Id)}
                                        >
                                            <Button  danger>Delete</Button>
                                        </Popconfirm>
                                        
                                    </Space>
                                )
                            }
                        }
                    ]}
                />
                <Modal
                    open={visible}
                    title={Id == null ? "New Employee" : "Update Employee"}
                    onCancel={onCloseModal}
                    footer={null}
                    maskClosable={false}
                >
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="Firstname"
                            label="Firstanme"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="Lastname"
                            label="Lastname"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="Gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Please select gender"
                                allowClear={true}
                                onChange={()=>{}}
                            >
                                <Option value={"1"}>Male</Option>
                                <Option value={"0"}>Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="Dob"
                            label="Dob"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="Tel"
                            label="Tel"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="Email"
                            label="Email"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="Address"
                            label="Address"
                        >
                            <Input.TextArea  />
                        </Form.Item>

                        <Form.Item
                            name="Role"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <Input  />
                        </Form.Item>


                        <Form.Item  wrapperCol={24} style={{textAlign:"right"}}>
                            <Space>
                                <Button htmlType="button" onClick={onCloseModal}>Cancel</Button>
                                <Button htmlType="button" onClick={onClearForm}>Clear</Button>
                                <Button htmlType="summit" type="primary">{Id == null ? "SAVE" : "UPDATE"}</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    )
}

export default EmplyeePage