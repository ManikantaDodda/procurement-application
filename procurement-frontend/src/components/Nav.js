// src/components/NavigationBar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Procurement App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-right">
            <NavDropdown title="Suppliers" id="suppliers-dropdown">
              <LinkContainer to="/">
                <NavDropdown.Item>Supplier List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/supplier-form">
                <NavDropdown.Item>Create New Supplier</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title="Items" id="items-dropdown">
              <LinkContainer to="/item">
                <NavDropdown.Item>Item List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/item-form">
                <NavDropdown.Item>Create New Item</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title="Purchase Orders" id="purchase-orders-dropdown">
              <LinkContainer to="/purchase-order">
                <NavDropdown.Item>Purchase Order List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/purchase-order-form">
                <NavDropdown.Item>Create New Purchase Order</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
