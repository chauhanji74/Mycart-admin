import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Container, Row, Col } from 'react-bootstrap';

/**
* @author
* @function Home
**/

export const Home = (props) => {
  const navigate = useNavigate();

  const callHomePage = async () => {
    try {
      const token = window.sessionStorage.getItem('key');
      console.log(token);
      if (token) {
        navigate("/");
        console.log("i have token");
      }
      else {
        navigate("/signin");
        console.log("i dont have token");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }

  }

  const getCateories = async () => {
    const res = await fetch('/category/getcategory', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const category = await res.json();
    console.log(category.categoryList[0].name);
    localStorage.setItem("category", JSON.stringify(category));
  }

  useEffect(() => {
    callHomePage();
    getCateories();
  }, []);

  const colapseSidebar = () => {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("ps").style.width = "0";
  }


  return (
    <>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} id='sidebar' style={{ backgroundColor: '#c3c6c7', height: '90vh', padding: "3px" }}>
              <div className="list-group">
                <NavLink to="/" className="list-group-item list-group-item-action my-nav-list">Home</NavLink>
                <NavLink to="/Categories" className="list-group-item list-group-item-action my-nav-list">Categories</NavLink>
                <NavLink to="/Products" className="list-group-item list-group-item-action my-nav-list">Products</NavLink>
                <NavLink to="/Orders" className="list-group-item list-group-item-action my-nav-list">Orders</NavLink>
              </div>
            </Col>
            <Col md={10}>
              <div className='text-center' style={{ padding: "4rem 2rem", marginBottem: "2rem", borderRadius: ".3rem" }}>
                <h1>Welcome to <span style={{ color: "violet" }}>Mycart</span> Admin DashBoard</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}