import React, { Component, useState } from 'react'
import axios from 'axios'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import Product from './Product'
import FilterBar from './FilterBar'

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            products: [],
            isNew: false,
            isAdmin: false
        }
        this.refreshData = this.refreshData.bind(this)
        this.setAdmin = this.setAdmin.bind(this)
        this.setNew = this.setNew.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }

    componentDidMount() {
        this.refreshData()
    }

    refreshData() {
        this.setNew(false)
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    setAdmin(flag) {
        this.setState({
            isAdmin: !!flag
        })
    }

    setNew(flag) {
        this.setState({
            isNew: !!flag
        })
    }

    handleFilter(price, bedrooms, bathrooms) {
        axios.post('/api/products/filter', { price, bedrooms, bathrooms }).then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    render() {
        const { isAdmin, products, isNew } = this.state

        return (
            <>
                <Container>
                    <Row className='justify-content-center'>
                        <Col>
                            <Card>
                                <Card.Header>
                                    All properties
                                <ButtonGroup className='float-right'>
                                        {isAdmin && <Button onClick={() => this.setNew(true)}>Add new property</Button>}
                                        {!isAdmin
                                            ? <Button onClick={() => this.setAdmin(true)}>Admin</Button>
                                            : <Button variant='danger' onClick={() => this.setAdmin(false)}>Logout</Button>
                                        }
                                    </ButtonGroup>
                                </Card.Header>
                                <Card.Body>
                                    <FilterBar handleFilter={this.handleFilter} />
                                    <Container fluid>
                                        {isNew && <Product
                                            isAdmin={isAdmin}
                                            isNew
                                            key={'new'}
                                            refreshData={this.refreshData}
                                        />}
                                        {
                                            products.map(product => <Product
                                                key={product.id}
                                                product={product}
                                                refreshData={this.refreshData}
                                            />)
                                        }
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home