// src/components/SupplierList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/api/get-suppliers', { params: { status: "all" } });
      setSuppliers(response.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  const handleStatusChange = async (supplierId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      await api.patch('/api/supplier-status-change', { _id: supplierId, status: newStatus });
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier._id === supplierId ? { ...supplier, status: newStatus } : supplier
        )
      );
    } catch (error) {
      console.error('Error changing supplier status:', error);
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm" >
      <Row className="mb-4">
        <Col>
          <h3 className="text-left">Supplier List</h3>
        </Col>
        <Col className="text-right">
          <Link to="/supplier-form">
            <Button variant="primary" className="float-right">
              + Create New Supplier
            </Button>
          </Link>
        </Col>
      </Row>

      <Table bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Supplier Name</th>
            <th>Country</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier._id}>
              <td>{index + 1}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.country}</td>
              <td>{supplier.email}</td>
              <td>{supplier.mobileNo}</td>
              <td>{supplier.status}</td>
              <td>
                <Button
                  variant={supplier.status === 'Active' ? 'danger' : 'success'}
                  onClick={() => handleStatusChange(supplier._id, supplier.status)}
                >
                  {supplier.status === 'Active' ? 'Block' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SupplierList;
