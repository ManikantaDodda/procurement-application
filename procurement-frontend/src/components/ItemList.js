// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/api/get-items', { params: { status: 'all' } });
      setItems(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleStatusChange = async (itemId, currentStatus) => {
    const newStatus = currentStatus === 'Enabled' ? 'Disabled' : 'Enabled';
    try {
      await api.patch('/api/item-status-change', { _id: itemId, status: newStatus });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error changing item status:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Item List</h3>
      <Link to="/item-form">
        <Button variant="primary" className="mb-3">
          Create New Item
        </Button>
      </Link>
      <Table bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Inventory Location</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Stock Unit</th>
            <th>Unit Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.itemNo}</td>
              <td>{item.itemName}</td>
              <td>{item.inventoryLocation}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item?.supplier?.supplierName}</td>
              <td>{item.stockUnit}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  variant={item.status === 'Enabled' ? 'danger' : 'success'}
                  onClick={() => handleStatusChange(item._id, item.status)}
                >
                  {item.status === 'Enabled' ? 'Disable' : 'Enable'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ItemList;
