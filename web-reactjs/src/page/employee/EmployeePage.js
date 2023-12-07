import { request } from "../../share/request";
import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, Tag, Input, Modal, Form, Select, Slider, Spin, message, Popconfirm, Col, Row, Divider } from 'antd';
import { formatDateClient, formatDateServer, Config } from "../../share/helper";
import { IoIosCloseCircle } from "react-icons/io";
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
    const [loading, setLoadin] = useState(false)
    const [visible, setVisible] = useState(false)
    const [Id, setId] = useState(null)
    const [image, setImage] = useState(null)
    const [imagePre, setImagePre] = useState(null);
    const [textSearch, setTextSearch] = useState("")

    const refMyImage = useRef()

    useEffect(() => {
        getList()
    }, []);

    const getList = async () => {
        setLoadin(true);
        var param = "";
        if (textSearch != "") {
            param = "?textSearch=" + textSearch
        }
        const res = await request("employee" + param, "get");
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

    const onDelete = async (rows) => {
        var param = {
            Id: rows.Id,
            Image: rows.Image,
        }
        const res = await request("employee", "delete", param);
        if (!res.error) {
            getList()
        } else {
            alert(res.meassage)
        }
    }

    const onFinish = async (values) => { // get value from form
        // can get data from form then past to api
        // var param = {
        //     "Firstname": values.Firstname,
        //     "Lastname": values.Lastname,
        //     "Gender": values.Gender,
        //     "Dob": values.Dob,
        //     "Email":values.Email,
        //     "Tel": values.Tel,
        //     "Address": values.Address,
        //     "Role": values.Role,
        //     "Image" : ""
        // }

        var formData = new FormData(); // create formData
        formData.append("Firstname", values.Firstname)
        formData.append("Lastname", values.Lastname)
        formData.append("Gender", values.Gender)
        formData.append("Dob", values.Dob)
        formData.append("Email", values.Email)
        formData.append("Tel", values.Tel)
        formData.append("Role", values.Role)
        formData.append("Address", values.Address)
        formData.append("Image", form.getFieldValue("Image"))
        if (image != null) {
            formData.append("image_emp", image, image.filename)
        } else {
            // remove , nothing
            // formData.append("image_emp",null)
            // if(imagePre == null){
            //     formData.append("isRemove",null)
            // } 
        }

        var method = "post"
        if (Id != null) { // mean update
            formData.append("Id", Id)
            method = "put"
        }
        const res = await request("employee", method, formData);
        if (!res.error) {
            message.success(res.message)
            getList()
            form.resetFields();
            onCloseModal();
        } else {
            message.error(res.message)
        }

    };

    const onClearForm = () => {
        form.resetFields();
        setImagePre(null)
        setImage(null)
        refMyImage.current.value = null
    }

    const onClickEdit = (item) => {
        setId(item.Id)
        form.setFieldsValue({
            Firstname: item.Firstname,
            Lastname: item.Lastname,
            Gender: item.Gender + "",
            Dob: formatDateServer(item.Dob),
            Email: item.Email,
            Tel: item.Tel,
            Address: item.Address,
            Role: item.Role,
            Image: item.Image
        });
        setImagePre(Config.image_path + item.Image)
        setVisible(true)
    }

    const onSearch = (value) => {
        getList()
    }

    const onChangeTextSearch = (e) => {
        setTextSearch(e.target.value)
    }

    const onChangFile = (e) => {
        var file = e.target.files[0];
        setImage(file)
        setImagePre(URL.createObjectURL(file)) // for pre view image
    }

    const onRmoveImageUpdate = (e) => {
        e.preventDefault()
        setImagePre(null)
        setImage(null)
        form.setFieldsValue({
            Image: null
        })
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
                            key: "Image",
                            title: "Image",
                            dataIndex: 'Image',
                            render: (value, rows, index) => {
                                return (
                                    <div>
                                        {(value != null && value != "")  ?
                                            <img
                                                key={index}
                                                src={Config.image_path + value}
                                                width={100}
                                            />
                                            : 
                                            <div style={{height:100,width:100,backgroundColor:'#eee'}} />
                                        }
                                    </div>
                                )
                            }
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
                                        <Button type="primary" onClick={() => onClickEdit(item)}>Edit</Button>
                                        <Popconfirm
                                            title="Delete"
                                            description="Are you sure to delete this record?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => onDelete(item)}
                                        >
                                            <Button danger>Delete</Button>
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
                    width={800}
                >
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    // style={{
                    //     maxWidth: 600,
                    // }}
                    >
                        <Divider />
                        <Row gutter={5}>
                            <Col span={12}>
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
                            </Col>
                            <Col span={12}>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
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
                                        onChange={() => { }}
                                    >
                                        <Option value={"1"}>Male</Option>
                                        <Option value={"0"}>Female</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
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
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
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
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Email"
                                    label="Email"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="Address"
                                    label="Address"
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Role"
                                    label="Role"
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="Select picture"
                                // name={"image"}
                                >
                                    <input
                                        type="file"
                                        ref={refMyImage}
                                        onChange={onChangFile}
                                    />
                                    <div>
                                        <img
                                            src={imagePre}
                                            width={100}
                                            style={{ marginTop: 10 }}
                                        />
                                        
                                            {(Id != null && imagePre != null) && 
                                                <div>    
                                                    <button onClick={onRmoveImageUpdate}>
                                                        <IoIosCloseCircle size={22} color="red"/>
                                                    </button>
                                                </div>
                                            }
                                      

                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>



                        <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
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