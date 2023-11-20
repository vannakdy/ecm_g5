// list , delete , create, update

// {
//     "customer_id": 1,
//     "firstname": "Dara",
//     "lastname": "Sok",
//     "gender": 1,
//     "dob": "2000-01-20T17:00:00.000Z",
//     "tel": "08888888",
//     "email": "darasok1111@gmail.com",
//     "status": 1,
//     "create_at": "2023-10-09T06:35:22.000Z"
// }

import { Table, Stack, Button, Modal, FloatingLabel, Form } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { request } from "../../share/request"
import moment from "moment"
const CustomerPage = () => {
    useEffect(() => {
        getList();
    }, [])

    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)

    const [customerId, setCustomerId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState(1);
    const [dob, setDob] = useState("2020-01-01");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");

    const getList = async () => {
        const res = await request("customer", "get", {})
        console.log(res)
        if (res) {
            setList(res.customer_list)
        }
    }

    const onClickEdit = (item) => {
        setVisible(true)
        setCustomerId(item.customer_id)
        setFirstname(item.firstname)
        setLastname(item.lastname)
        setGender(item.gender)
        setDob(item.dob)
        setTel(item.tel)
        setEmail(item.email)

    }

    const onDelete = (id) => {
        const res = request("customer/" + id, "delete")
        if (res) {
            getList();
        }
    }

    const onOpenModal = () => {
        setVisible(true)
    }

    const onCancel = () => {
        setVisible(false)
        onClear();
    }

    const onClear = () => {
        setCustomerId("")
        setFirstname("")
        setLastname("")
        setGender(1)
        setEmail("")
        setTel("")
        setDob("2020-01-01")
    }

    const onSubmit = async () => {
        if (customerId == "") {
            // save
            var param = {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: dob,
                tel: tel,
                email: email
            }
            const res = await request("customer", "post", param);
            onClear()
            setVisible(false)
            if (res) {
                if (!res.error) {
                    getList()
                } else {
                    alert(res.message)
                }
            }
        } else {
            // update
            var param = {
                "customer_id" : customerId,
                "firstname": firstname,
                lastname: lastname,
                gender: gender,
                dob: dob,
                tel: tel,
                email: email
            }
            const res = await request("customer", "put", param);
            onClear()
            setVisible(false)
            if (res) {
                if (!res.error) {
                    getList()
                } else {
                    alert(res.message)
                }
            }
        }

    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
                <div>Customer</div>
                <Button onClick={onOpenModal}>New Customer</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Fristname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                        <th>Dob</th>
                        <th>Email</th>
                        <th>Tel</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.gender == 1 ? "Male" : "Female"}</td>
                            <td>{moment(item.dob).format("DD/MM/YYYY")}</td>
                            <td>{item.email}</td>
                            <td>{item.tel}</td>
                            <td>{item.status == 1 ? "Actived" : "Disabled"}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='small' onClick={() => onClickEdit(item)}>Edit</Button>{' '}
                                    <Button size='small' variant="danger" onClick={() => onDelete(item.customer_id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible}>
                <Modal.Header>
                    <Modal.Title>{(customerId == "") ? "New" : "Update"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="firstname"
                        label="Firstname"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setFirstname(event.target.value)}
                            value={firstname}
                            type="text"
                            placeholder="firstname"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="lastname"
                        label="Lastname"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setLastname(event.target.value)}
                            value={lastname}
                            type="text"
                            placeholder="lastname"
                        />
                    </FloatingLabel>
                    {/* gender combobox */}
                    {/* dob calendar */}
                    <FloatingLabel
                        controlId="tel"
                        label="Tel"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setTel(event.target.value)}
                            value={tel}
                            type="text"
                            placeholder="tel"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="email"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            type="text"
                            placeholder="email"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(customerId == "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CustomerPage;