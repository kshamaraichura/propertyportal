import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Col, Form, Row } from 'react-bootstrap'

const defaultProduct = {
    id: -1,
    name: '',
    description: '',
    price: 0.00,
    bedrooms: 0,
    bathrooms: 0,
    images: 'img/default.png'
}

export default (props) => {
    const { refreshData } = props

    const [product, setProduct] = useState(props.product || defaultProduct)
    const [isNew, setNew] = useState(props.isNew || false)
    const [isEdit, setEdit] = useState(props.isNew || false)

    const handleAdd = () => {
        if (!product.images) {
            setProduct({ ...product, images: 'img/default.png' })
        }

        setEdit(false)
        setNew(false)
        axios.post('/api/products/', product)
            .then(response => {
                refreshData()
            })
            .catch(error => {
                alert('Failed to add new data');
                refreshData()
            })        
    }

    const handleUpdate = () => {
        setEdit(false)

        if (!product.images) {
            setProduct({ ...product, images: 'img/default.png' })
        }

        axios.put('/api/products/' + product.id, product).then(() => {
            refreshData()
        })
    }

    const handleDelete = () => {
        axios.delete('/api/products/' + product.id).then(() => {
            refreshData()
        })
    }

    const handleCancel = () => {
        setEdit(false)
        setProduct(props.product)
        isNew && refreshData()
    }

    const setProductValue = (key, value) => {
        setProduct({ ...product, [key]: value })
    }

    return (
        product
            ? <Card body>
                {isNew && <Row>Add New Record</Row>}
                <Row>
                    <Col md={4}>
                        <img src={product.images || 'img/default.png'} height='150px' />
                    </Col>
                    {!isEdit
                        ? <Col md={5}>
                            <Row>{product.name}</Row>
                            <Row>{product.description}</Row>
                            <Row>${product.price}</Row>
                            <Row>Bedrooms: {product.bedrooms}</Row>
                            <Row>Bathrooms: {product.bathrooms}</Row>
                        </Col>
                        :
                        <Col md={5}>
                            <Row>Name: <Form.Control required as='input' size='sm' type='text' placeholder={product.name} value={product.name} onChange={e => setProductValue('name', e.target.value)} /></Row>
                            <Row>Description: <Form.Control required as='input' size='sm' type='text' placeholder={product.description} value={product.description} onChange={e => setProductValue('description', e.target.value)} /></Row>
                            <Row>Price: $<Form.Control required as='input' size='sm' type='number' placeholder={product.price} value={product.price} onChange={e => setProductValue('price', e.target.value)} /></Row>
                            <Row>Bedrooms: <Form.Control required as='input' size='sm' type='number' placeholder={product.bedrooms} value={product.bedrooms} onChange={e => setProductValue('bedrooms', e.target.value)} /></Row>
                            <Row>Bathrooms: <Form.Control required as='input' size='sm' type='number' placeholder={product.bathrooms} value={product.bathrooms} onChange={e => setProductValue('bathrooms', e.target.value)} /></Row>
                        </Col>
                    }
                    <Col md={3}>
                        {!isEdit
                            ? <ButtonGroup>
                                <Button variant='primary' onClick={() => setEdit(true)}>Edit</Button>
                                <Button variant='danger' onClick={handleDelete}>Delete</Button>
                            </ButtonGroup>
                            : <ButtonGroup>
                                {isNew
                                    ? <Button variant='success' onClick={handleAdd}>Save</Button>
                                    : <Button variant='primary' onClick={handleUpdate}>Update</Button>
                                }
                                <Button variant='danger' onClick={handleCancel}>Cancel</Button>
                            </ButtonGroup>
                        }
                    </Col>
                </Row>
            </Card>
            : null
    )
}