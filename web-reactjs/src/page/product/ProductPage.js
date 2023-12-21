import React, { useEffect, useState } from 'react'
import { request } from "../../share/request"
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Spin, Table, message } from 'antd'
import { Config, formatDateClient } from '../../share/helper'
import styles from "./styles.module.css"
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

function ProductPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [totalRecord, setTotalRecord] = useState(0)
    const [listCategory,setListCategory] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePre, setImagePre] = useState(null)

    const [objFilter,setObjFilter] = useState({
        page : 1,
        txtSearch : ""
    })

    useEffect(() => {
        getList(objFilter)
        getListCategory()
    }, [])

    const getListCategory = async () => {
        const resCat = await request("category", "get");
        if (resCat) {
            setListCategory(resCat.list);
        }
    }

    const getList = async (ParamObjFilter) => {
        setLoading(true)
        var param = "?page="+ParamObjFilter.page
        param += "&txtSearch="+ParamObjFilter.txtSearch
        const res = await request("product"+param, "get");
        setLoading(false)
        if (res) {
            setList(res.list)
            if(ParamObjFilter.page == 1){
                setTotalRecord(res.total[0].Total)
            }
            
        }
    }

    const onSave = () => {
        // CategoryId,Name,Description,Price,Status, CreateBy
    }

    const onChangeTextSearch = () => {

    }

    const onSearch = (value) => {
        var objTmp = {
            ...objFilter,
            txtSearch:value,
            page: value == "" ? 1 : objFilter.page
        }
        setObjFilter(objTmp)
        getList(objTmp)
    }

    const onNewProductClick = () => {
        setVisibleModal(true)
    }

    const onCloseModal = () => {
        setVisibleModal(false)
        form.resetFields();
    }

    const onFinish = async (value) => {
        try{
            var formData = new FormData();
            formData.append("Name",value.Name)
            formData.append("Price",value.Price)
            formData.append("Status",value.Status)
            formData.append("CategoryId",value.CategoryId)
            formData.append("Description",value.Description)
            formData.append("image_product",null)
            if(image != null){
                formData.append("image_product",image,image.filename)
            }
            setLoading(true)
            const res = await request("product", "post",formData);
            setLoading(false)
            if (res) {
               message.success("Save success!")
               onCloseModal()
               getList();
            }
        }catch(error){
            alert("dddd")
        }
    }

    const onChangePage = (page) => {
        var objTmp = {
            ...objFilter,
            page:page,
        }
        setObjFilter(objTmp)
        getList(objTmp)
    }

    const onChangFile = (e) => {
        var file = e.target.files[0];
        setImage(file)
        setImagePre(URL.createObjectURL(file)) // for pre view image
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.headerContainer}>
                <div className={styles.containFilter}>
                    <div>
                        <div className='txtPageTitle'>Product</div>
                        <div>total : {totalRecord} Items</div>
                    </div>
                    <Input.Search allowClear onSearch={onSearch} onChange={onChangeTextSearch} />
                </div>
                <Button onClick={onNewProductClick}>New Product</Button>
            </div>
            <Table
                pagination={{
                    total:totalRecord,
                    pageSize:3,
                    onChange:onChangePage
                }}
                dataSource={list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (value, items, index) => index + 1
                    },
                    {
                        key: "Name",
                        title: "Name",
                        dataIndex: "Name",
                        sorter: (a, b) => a.Name.length - b.Name.length
                    },
                    {
                        key: "CategoryId",
                        title: "CategoryId",
                        dataIndex: "CategoryId",
                    },
                    {
                        key: "Description",
                        title: "Description",
                        dataIndex: "Description",
                    },
                    {
                        key: "Status",
                        title: "Status",
                        dataIndex: "Status",
                        render: (value) => (value == 1 ? "Actived" : "Disabled")
                    },
                    {
                        key: "Image",
                        title: "Image",
                        dataIndex: "Image",
                        render: (value) => {
                            return (
                                <div>
                                    {(value != "" && value != null) ? 
                                        <div>
                                            <Image 
                                                width={100}
                                                src={Config.image_path+value}
                                            />
                                        </div>
                                        : 
                                        <div style={{height:100,width:100,backgroundColor:'#eee'}} />
                                    }
                                </div>
                            )
                        }
                    },
                    {
                        key: "CreateAt",
                        title: "CreateAt",
                        dataIndex: "CreateAt",
                        render: (value) => formatDateClient(value)
                    },
                    {
                        key: "Action",
                        title: "Action",
                        dataIndex: "Action",
                        align: 'right',
                        width: 150,
                        render: (value) => {
                            return (
                                <Space>
                                    <Button type="primary">Edit</Button>
                                    <Button danger>Delete</Button>
                                </Space>
                            )
                        }
                    }
                ]}
            />

            <Modal
                title="New Product"
                open={visibleModal}
                onCancel={onCloseModal}
                footer={null}
                width={800}
                style={{}}
                maskClosable={false}
            >
                <Divider />
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                >
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Product Name"
                                name={"Name"}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <Input placeholder='Porduct name' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                                name={"CategoryId"}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                {/* <Input placeholder='Category' /> */}
                                <Select placeholder="Select category" allowClear>
                                    {listCategory.map((item,index)=>(
                                        <Select.Option key={index} value={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Description"
                                name={"Description"}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <Input placeholder='Description' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name={"Price"}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <InputNumber style={{width:"100%"}} placeholder='Price' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Status"
                                name={"Status"}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                               <Select placeholder="Select status" allowClear >
                                    <Select.Option value={"1"}>Active</Select.Option>
                                    <Select.Option value={"0"}>Disable</Select.Option>
                               </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Image"
                                name={"Image"}
                                // rules={[
                                //     {
                                //         required: true
                                //     },
                                // ]}
                            >
                                <input 
                                    onChange={onChangFile}
                                    type='file' 
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button htmlType='submit' type='primary'>Save</Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Modal>

        </Spin>
    )
}

export default ProductPage
