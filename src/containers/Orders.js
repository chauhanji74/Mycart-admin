import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Layout } from '../components/Layout'

/**
* @author
* @function Orders
**/

export const Orders = (props) => {
  return(
    <Layout>
        <Container fluid>
          <Row>
            <Col md={2} id='sidebar' style={{ backgroundColor: '#c3c6c7', height: '90vh', padding: "3px"  }}>
              <div class="list-group">
                <NavLink to="/" className="list-group-item list-group-item-action my-nav-list " aria-current="true">Home</NavLink>
                <NavLink to="/Categories" className="list-group-item list-group-item-action my-nav-list">Categories</NavLink>
                <NavLink to="/Products" className="list-group-item list-group-item-action my-nav-list">Products</NavLink>
                <NavLink to="/Orders" className="list-group-item list-group-item-action my-nav-list">Orders</NavLink>
              </div>
            </Col>
            <Col md={10}>
              <div className='text-center' style={{ padding: "4rem 2rem", marginBottem: "2rem", borderRadius: ".3rem" }}>
                <h1>Orders</h1>
              </div>
            </Col>
          </Row>
        </Container>
    </Layout>
   )

 }