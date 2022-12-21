import ReactTypingEffect from 'react-typing-effect';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from "react"
import axios from "axios"


function Register({ title, description }) {
    const [NIP, setNip] = useState("")
    const [Nama, setName] = useState("")
    const [password, setPwd] = useState("")

    const handleNIP = (inputNIP) => {
        setNip(inputNIP)
    }

    const handleNama = (inputNama) => {
        setName(inputNama)
    }

    const handlePwd = (inputPwd) => {
        setPwd(inputPwd)
    }

    const userRegister = () => {
        console.log('user login ready!')
        // My User name is: 1080, password: 123

        const requestingData = {
            nip: NIP,
            nama: Nama,
            password: password
        }

        axios({
            method: "POST",
            url: "http://localhost:3200/users",
            data: requestingData
        }).then((result) => {
            console.log(result.data)
            if (result.data.registered) {
                alert("Registered Successfully")
                window.location.replace("/login")
            } else {
                alert("Failed to register, try with other NOEMP (NIP)")
            }
        })
    }

    return (
        <Container>
            <div className="d-flex justify-content-center fw-bold h3 my-4">
                <ReactTypingEffect
                    text={[title, description]}
                    speed={200}
                    eraseDelay={1100}
                    eraseSpeed={70}
                    typingDelay={100}
                />
            </div>
            <Form className="w-50 mx-auto">
                <Form.Group>
                    <Form.Label className="fw-bold">NIP</Form.Label>
                    <Form.Control type="number" placeholder='enter your NOEMP' required onChange={(event) => handleNIP(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold">Name</Form.Label>
                    <Form.Control type="text" placeholder='enter your name' required onChange={(event) => handleNama(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control type="password" placeholder='*****' required onChange={(event) => handlePwd(event.target.value)} />
                </Form.Group>
                <Button className="mt-4 w-100" onClick={() => userRegister()} Primary >Register Now</Button>
            </Form>
        </Container>
    )
}

export default Register