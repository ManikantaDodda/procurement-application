// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Form, Button, Row, Col,Container } from 'react-bootstrap';

function ItemForm() {
  const [item, setItem] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: '',
    unitPrice: '',
    itemImages: [],
    status: 'Enabled'
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get('/api/get-suppliers');
        setSuppliers(response.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setItem((prev) => ({ ...prev, itemImages: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(item).forEach(([key, value]) => {
      if (key === 'itemImages') {
        for (let file of value) formData.append(key, file);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await api.post('/api/create-item', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm" >
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Add New Item</h3>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="itemName"
              value={item.itemName}
              onChange={handleChange}
              required
              placeholder="Enter item name"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Inventory Location</Form.Label>
            <Form.Control
              type="text"
              name="inventoryLocation"
              value={item.inventoryLocation}
              onChange={handleChange}
              placeholder="Enter inventory location"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={item.brand}
              onChange={handleChange}
              placeholder="Enter brand"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={item.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              as="select"
              name="supplier"
              value={item.supplier}
              onChange={handleChange}
              required
            >
              <option>Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>{s.supplierName}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Stock Unit</Form.Label>
            <Form.Control
              as="select"
              name="stockUnit"
              value={item.stockUnit}
              onChange={handleChange}
              required
            >
              <option>Select Unit</option>
              <option value="pcs">Pcs</option>
              <option value="kg">Kg</option>
              <option value="ltr">Ltr</option>
              {/* Add more units as required */}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              name="unitPrice"
              value={item.unitPrice}
              onChange={handleChange}
              required
              placeholder="Enter unit price"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Item Images</Form.Label>
        <Form.Control
          type="file"
          name="itemImages"
          multiple
          onChange={handleFileChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={item.status}
          onChange={handleChange}
        >
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" block>
        Add Item
      </Button>
    </Form>
    </Container>
  );
}

export default ItemForm;
