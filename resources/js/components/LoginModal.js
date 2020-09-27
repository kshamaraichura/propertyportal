import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default (props) => {
    const [uid, setUid] = useState('')
    const [pwd, setPwd] = useState('')
    const { isShow, handleClose, adminMode } = props

    const handleLogin = () => {
        if (uid === 'admin' && pwd === 'admin') {
            adminMode()
        } else {
            alert('Oops! Invalid credentails.')
        }
    }

    return (
        <Modal show={isShow} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Username: <Form.Control as='input' id='username' name='username' placeholder='User name' value={uid} onChange={e => setUid(e.target.value)} /><br />
                Password: <Form.Control as='input' id='password' name='password' placeholder='Password' value={pwd} onChange={e => setPwd(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleLogin}>Login</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}