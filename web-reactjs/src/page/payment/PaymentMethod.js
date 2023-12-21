import React, { useEffect, useState } from 'react'
import {request} from "../../share/request"
import { Button, Space, Spin, Table } from 'antd'
import { formatDateClient } from '../../share/helper'
function PaymentMethod() {

    const [loading,setLoading] = useState(false)
    const [list,setList] = useState([])

    useEffect(()=>{
        getList()
    },[])

    const getList = async () => {
        setLoading(true)
        const res = await request("payment_method","get");
        setLoading(false)
        if(res){
            setList(res.list)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className='txtPageTitle'>Payment method</div>
            <Table 
                dataSource={list}
                columns={[
                    {
                        key:"No",
                        title:"No",
                        render : (value,items,index) => index + 1 
                    },
                    {
                        key: "Name",
                        title: "Name",
                        dataIndex: "Name",
                    },
                    {
                        key: "Code",
                        title: "Code",
                        dataIndex: "Code",
                    },
                    {
                        key: "Description",
                        title: "Description",
                        dataIndex: "Description",
                    },
                    {
                        key: "CreateAt",
                        title: "CreateAt",
                        dataIndex: "CreateAt",
                        render : (value) =>  formatDateClient(value)
                    },
                    {
                        key: "Action",
                        title: "Action",
                        dataIndex: "Action",
                        align:'right',
                        width:150,
                        render : (value) =>  {
                            return (
                                <Space>
                                    <Button type="primary">Edit</Button>
                                    <Button  danger>Delete</Button>
                                </Space>
                            )
                        }
                    }
                ]}
            />
        </Spin>
    )
}

export default PaymentMethod
