// src/components/SupplierForm.js
import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function SupplierForm() {
  const [supplier, setSupplier] = useState({
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/create-supplier', supplier);
      alert('Supplier created successfully');
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm" >
      <Form onSubmit={handleSubmit}  className="p-4 border rounded shadow-sm">
        <h3 className="text-center mb-4">Add New Supplier</h3>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="supplierName">
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                type="text"
                name="supplierName"
                value={supplier.supplierName}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={supplier.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="taxNo">
              <Form.Label>TAX No</Form.Label>
              <Form.Control
                type="text"
                name="taxNo"
                value={supplier.taxNo}
                onChange={handleChange}
                placeholder="Enter tax number"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={supplier.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
                {/* Add more countries as needed */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={supplier.mobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={supplier.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={supplier.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Add Supplier
        </Button>
      </Form>
      </Container>
  );
}

export default SupplierForm;
