import { useState } from "react"
import { Form, Button, FormControl } from "react-bootstrap"
import axios from 'axios'
import { logout } from "./logout"

const Edit = ({ title }) => {

    const [name, setNama] = useState("")
    const [pwd, setPassword] = useState("")
    const [npwd, setPasswordBaru] = useState("")

    
    const updateProfile = () => {
        const requestingData = {
            nip: localStorage.getItem("nip"),
            passwordBaru: npwd,
            password: pwd,
            nama: name
        }
        axios({
            method: "PUT",
            url: `http://localhost:3200/users`,
            data: requestingData
        }).then(() => {
            alert("you will get out of the system, please relogin.")
            logout()
        })
    }

    return(
        <Form className="my-4">
            <h3>{title}</h3>
            <Form.Group>
                <Form.Label>Nama</Form.Label>
                <FormControl onChange={(event) => setNama(event.target.value)} defaultValue={localStorage.getItem("nama")}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                <FormControl onChange={(event) => setPasswordBaru(event.target.value)}/>
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Label>Old Password</Form.Label>
                <FormControl onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Form.Text className="text-muted">Please enter your old password. 
                You must relogin after you update your password.</Form.Text>
            <Button className="w-100" onClick={() => updateProfile()}>Update Profile</Button>   
        </Form>
    )
}

export default Edit;