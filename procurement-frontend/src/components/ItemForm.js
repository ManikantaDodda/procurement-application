import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Form, Button, Row, Col,Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagePreview from './ImagePreview';

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
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

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
  
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'itemName':
        if (!value) error = 'Item name is required';
        break;
      case 'inventoryLocation':
        if (!value) error = 'Inventory Location name is required';
        break;
      case 'brand':
        if (!value) error = 'Brand name is required';
        break;
      case 'category':
        if (!value) error = 'Category name is required';
        break;
      case 'supplier':
        if (!value) error = 'Supplier is required';
        break;
      case 'stockUnit':
        if (!value) error = 'Stock unit is required';
        break;
      case 'unitPrice':
        if (!value || value <= 0) error = 'Valid unit price is required';
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setItem((prev) => ({ ...prev, itemImages: [...prev.itemImages, ...files] }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };
  const removeImage = useCallback((index) => {
    setItem((prev) => ({
      ...prev,
      itemImages: prev.itemImages.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.keys(item).map((key) => validateField(key, item[key]));
    const hasErrors = formErrors.some((error) => error !== '');

    if (hasErrors) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

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
      toast.success('Item added successfully');
      setItem({
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
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Error adding item');
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm">
    <ToastContainer />
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
              placeholder="Enter item name"
              required
              isInvalid={!!errors.itemName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.itemName}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.inventoryLocation}
            />
            <Form.Control.Feedback type="invalid">
              {errors.inventoryLocation}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.brand}
            />
            <Form.Control.Feedback type="invalid">
              {errors.brand}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.supplier}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>{s.supplierName}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.supplier}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.stockUnit}
            >
              <option value="">Select Unit</option>
              <option value="pcs">Pcs</option>
              <option value="kg">Kg</option>
              <option value="ltr">Ltr</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.stockUnit}
            </Form.Control.Feedback>
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
              placeholder="Enter unit price"
              isInvalid={!!errors.unitPrice}
            />
            <Form.Control.Feedback type="invalid">
              {errors.unitPrice}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Item Images</Form.Label>
        <Form.Control
          type="file"
          name="itemImages"
          multiple
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          required
        />
      </Form.Group>
      <ImagePreview imagePreviews={imagePreviews} removeImage = {removeImage}/>

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

      <Button variant="primary" type="submit" className="w-100">
        Add Item
      </Button>
    </Form>
  </Container>
  );
}

export default ItemForm;
