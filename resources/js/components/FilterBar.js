import React, { useState } from 'react'
import { Col, Card, Row, Form, Button } from 'react-bootstrap'

const priceRange = {
    0: 'Select',
    1: '< 100K',
    2: '100K - 300K',
    3: '> 300K'
}

const bedroomRange = {
    0: 'Select',
    1: '1',
    2: '2',
    3: '> 2'
}

const bathroomRange = {
    0: 'Select',
    1: '1',
    2: '2',
    3: '> 2'
}

export default (props) => {
    const [price, setPrice] = useState(0)
    const [bedroom, setBedroom] = useState(0)
    const [bathroom, setBathroom] = useState(0)

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col lg={4} md={4}>
                        Price:
                        <Form.Control
                            as='select'
                            name='price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        >
                            {Object.entries(priceRange)
                                .map(p => <option key={p[0]} value={p[0]}>{p[1]}</option>)
                            }
                        </Form.Control>
                    </Col>
                    <Col lg={4} md={4}>
                        Bedroom:
                        <Form.Control
                            as='select'
                            name='bedroom'
                            value={bedroom}
                            onChange={e => setBedroom(e.target.value)}
                        >
                            {Object.entries(bedroomRange)
                                .map(p => <option key={p[0]} value={p[0]}>{p[1]}</option>)
                            }
                        </Form.Control>
                    </Col>
                    <Col lg={4} md={4}>
                        Bathroom:
                        <Form.Control
                            as='select'
                            name='bathroom'
                            value={bathroom}
                            onChange={e => setBathroom(e.target.value)}
                        >
                            {Object.entries(bathroomRange)
                                .map(p => <option key={p[0]} value={p[0]}>{p[1]}</option>)
                            }
                        </Form.Control>
                    </Col>
                </Row>
                <Row style={{ paddingTop: '5px' }}>
                    <Col className='float-right'>
                        <Button
                            className='float-right'
                            onClick={() => props.handleFilter(price, bedroom, bathroom)}
                        >Filter</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}