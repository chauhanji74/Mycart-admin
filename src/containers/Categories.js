import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Container, Row, Col, Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';

/**
* @author
* @function Categories
**/

export const Categories = (props) => {
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addCategory = async () =>{
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryImage', categoryImage);
        const cat = {
            categoryName,
            categoryParentId,
            categoryImage
        }
        console.log(cat);
        const res = await fetch("/category/create", {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('key')}`
            },
            body: form
        });
        const data = await res.json();
        if(data){
            navigate('/');
        }
        setShow(false);
    }

    const allcategory = window.localStorage.getItem('category');
    let category = JSON.parse(allcategory);
    //console.log(category);
    const renderCategories =  (categoryList) => {
        let myCategories = [];
        for (let category of categoryList) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }
    //console.log(renderCategories(category.categoryList))
    const createCategoryList = (categoryList, options = [ ]) =>{
        for(let category of categoryList){
            options.push({
                value: category._id,
                name: category.name
            })
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options ;
    }

    const handleCategoryImage = (e) =>{
        setCategoryImage(e.target.files[0])
    }

    return (
        <>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md={2} id='sidebar' style={{ backgroundColor: '#c3c6c7', height: '90vh', padding: "3px" }}>
                            <div class="list-group">
                                <NavLink to="/" className="list-group-item list-group-item-action my-nav-list">Home</NavLink>
                                <NavLink to="/Categories" className="list-group-item list-group-item-action my-nav-list">Categories</NavLink>
                                <NavLink to="/Products" className="list-group-item list-group-item-action my-nav-list">Products</NavLink>
                                <NavLink to="/Orders" className="list-group-item list-group-item-action my-nav-list">Orders</NavLink>
                            </div>
                        </Col>
                        <Col md={10}>
                            <Container>
                                <Row>
                                    <Col md={12}>
                                        <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
                                            <h3>Category</h3>
                                            <button type="button" onClick={handleShow} className="btn btn-secondary">Add Category</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <ul>
                                            {renderCategories(category.categoryList)}
                                        </ul>
                                    </Col>
                                </Row>
                            </Container>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Add New Category</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder='Category Name'
                                            value={categoryName}
                                            onChange={(e)=> setCategoryName(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                        <Form.Select value={categoryParentId}  onChange={(e) => setCategoryParentId(e.target.value)} 
                                        aria-label="Default select example">
                                        <option>Select Category</option>
                                        {
                                            createCategoryList(category.categoryList).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                        </Form.Select>
                                        </InputGroup>
                                        <InputGroup style={{marginTop: "18px"}}>
                                            <FormControl type="file" name="categoryImage" onChange={handleCategoryImage}></FormControl>
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={addCategory}>
                                        Add
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>

    )

}