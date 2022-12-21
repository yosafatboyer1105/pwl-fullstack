import ReactTypingEffect from 'react-typing-effect';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from "react"
import axios from "axios"


function Login({ title, description }) {
    const [NIP, setNip] = useState("")
    const [password, setPwd] = useState("")

    const handleNIP = (inputNIP) => {
        setNip(inputNIP)
    }

    const handlePwd = (inputPwd) => {
        setPwd(inputPwd)
    }

    const userLogin = () => {
        console.log('user login ready!')

        const requestingData = {
            nip: NIP,
            password: password
        }
        axios({
            method: "POST",
            url: "http://localhost:3200/users/login",
            data: requestingData
        }).then((result)=> {
            localStorage.setItem("nip", result.data.users.nip)
            localStorage.setItem("nama", result.data.users.nama)
            window.location.replace("/dashboard")
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
                    <Form.Control type="number" placeholder='enter your NOEMP' required onChange={(event) => handleNIP(event.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control type="password" placeholder='*****' required onChange={(event) => handlePwd(event.target.value)} />
                </Form.Group>
                <Button className="mt-4 w-100" onClick={() => userLogin()} Primary >Login Now</Button>
            </Form>
        </Container>
    )
}

export default Login