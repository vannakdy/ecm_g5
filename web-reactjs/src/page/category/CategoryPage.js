
import axios from "axios"
import {useEffect, useState} from "react"
import Table from 'react-bootstrap/Table';
import { request } from "../../share/request";
import { Button,Modal,Stack,FloatingLabel, Form } from "react-bootstrap";

const CategryPage = () => {

    const [list,setList] = useState([])
    const [visible,setVisible] = useState(false)
 
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [description,setDescriptoin] = useState("")
    const [status,setStatus] = useState("")

    useEffect(()=>{
        // block form load
        getList();
    },[]);

    const getList = async () => { // create function success
        // request("category","get",{}).then(res=>{
        //     if(res){
        //         setList(res.list)
        //     }
        // })
        
        const res = await request("category","get",{})
        if(res){
            setList(res.list)
        }
    }

    const onOpenModal = () => {
        setVisible(true)
    }

    const onCloseModal = () => {
        setVisible(false)
        setId("")
        setName("")
        setDescriptoin("")
        setStatus("")
    }

    const onSave = () => {
        if(id == ""){
            var data = {
                Name : name, 
                Description : description, 
                Parent : null, 
                Status : status
            }
            const res = request("category","post",data)
            onCloseModal()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }else{
            // update
            var data = {
                Id : id,
                Name : name, 
                Description : description, 
                Parent : null, 
                Status : status
            }
            const res = request("category","put",data)
            onCloseModal()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }
        
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeDes = (event) => {
        setDescriptoin(event.target.value)
    }

    const onChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    const onDelete = async (Id) => {
        const res =  await request("category/"+Id,"delete",{})
        if(res){
            getList();
        }else{
            alert("Error!")
        }
    }

    const onClickEdit = (item) => {
        setId(item.Id);
        setName(item.Name);
        setDescriptoin(item.Description);
        setStatus(item.Status)
        setVisible(true) // just opent
    }

    return (
        <div>
            <div style={{background:'red'}}>
                <div>{name}</div>
                <div>{description}</div>
                <div>{status}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:5}}>
                <div>CategryPage</div>
                <Button onClick={onOpenModal}>New Category</Button>
            </div>
            {/* Table Bootstarp */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Status}</td>
                            <td style={{width:100}}>
                                <Stack gap={1} direction="horizontal">
                                    <Button onClick={()=>onClickEdit(item)}>Edit</Button>{' '}
                                    <Button variant="danger" onClick={()=>onDelete(item.Id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible} >
                <Modal.Header>
                    <Modal.Title>{(id == "") ? "New" : "Update"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="name"
                        label="Category name"
                        className="mb-3"
                    >
                        <Form.Control onChange={onChangeName} value={name} type="text" placeholder="name" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="description"
                        label="Description"
                        className="mb-3"
                    >
                        <Form.Control onChange={onChangeDes} value={description} type="text" placeholder="description" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="status"
                        label="Status"
                        className="mb-3"
                    >
                        <Form.Control onChange={onChangeStatus} value={status} type="text" placeholder="status" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseModal} variant="secondary">Cancel</Button>
                    <Button onClick={onSave} variant="primary">{id == "" ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>  
        </div>
    )
}

export default CategryPage;