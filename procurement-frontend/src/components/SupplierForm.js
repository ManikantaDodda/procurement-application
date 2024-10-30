import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [validationErrors, setValidationErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'supplierName':
        if (!value) error = 'Supplier Name is required';
        break;
      case 'address':
        if (!value) error = 'Address is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
        break;
      case 'mobileNo':
        if (!value) error = 'Mobile number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Mobile number must be 10 digits';
        break;
      case 'taxNo':
        if (!value) error = 'TAX number is required';
        else if (!/^[A-Za-z0-9]{6,12}$/.test(value)) error = 'Invalid TAX number';
        break;
      case 'country':
        if (!value) error = 'Country is required';
        break;
      default:
        break;
    }

    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(supplier)) {
    validateField(key, value);
    }
    const isFormValid = Object.values(validationErrors).every((err) => err === '') && 
                        Object.values(supplier).every((val) => val);

    if (isFormValid) {
      try {
        await api.post('/api/create-supplier', supplier);
        toast.success('Supplier created successfully');
        setSupplier({
          supplierName: '',
          address: '',
          taxNo: '',
          country: '',
          mobileNo: '',
          email: '',
          status: 'Active'
        });
        setValidated(false);
      } catch (error) {
        toast.error('Error creating supplier');
      }
    } else {
      setValidated(true);
      toast.error('Please fill out all required fields correctly.');
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm">
      <ToastContainer />
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
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
                isInvalid={!!validationErrors.supplierName}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.supplierName}
              </Form.Control.Feedback>
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
                required
                isInvalid={!!validationErrors.address}
              />
               <Form.Control.Feedback type="invalid">
                {validationErrors.address}
              </Form.Control.Feedback>
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
                required
                isInvalid={!!validationErrors.taxNo}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.taxNo}
              </Form.Control.Feedback>
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
                isInvalid={!!validationErrors.country}
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.country}
              </Form.Control.Feedback>
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
                required
                isInvalid={!!validationErrors.mobileNo}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.mobileNo}
              </Form.Control.Feedback>
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
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
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
